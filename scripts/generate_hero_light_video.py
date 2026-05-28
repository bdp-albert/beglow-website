from pathlib import Path

import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "beglow-architectural-lighting.png"
OUTPUT = ROOT / "public" / "beglow-architectural-lighting-animated.mp4"

FPS = 30
DURATION_SECONDS = 6.0
HOLD_SECONDS = 0.55


def smoothstep(edge0, edge1, x):
    x = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return x * x * (3.0 - 2.0 * x)


def make_light_mask(image):
    rgb = np.asarray(image).astype(np.float32) / 255.0
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

    warm = np.clip((r - b) * 2.2 + (g - b) * 0.9, 0.0, 1.0)
    bright = smoothstep(0.34, 0.82, luminance)
    line_bias = smoothstep(0.48, 0.92, r) * smoothstep(0.28, 0.72, g)
    mask = np.clip((bright * 0.72 + line_bias * 0.62) * (0.42 + warm * 0.85), 0.0, 1.0)

    # Blur gives the light a natural halo and keeps the reveal from looking clipped.
    mask_img = Image.fromarray(np.uint8(mask * 255), "L")
    halo = mask_img.filter(ImageFilter.GaussianBlur(10))
    core = mask_img.filter(ImageFilter.GaussianBlur(2))
    combined = np.maximum(np.asarray(core), np.asarray(halo) * 0.78).astype(np.float32) / 255.0
    return np.clip(combined, 0.0, 1.0)


def make_frame(final_rgb, light_mask, frame_index, total_frames):
    height, width, _ = final_rgb.shape
    t = frame_index / max(total_frames - 1, 1)
    active_duration = 1.0 - HOLD_SECONDS / DURATION_SECONDS

    if t >= active_duration:
        return np.uint8(final_rgb * 255.0)

    p = smoothstep(0.0, active_duration, t)
    y, x = np.mgrid[0:height, 0:width].astype(np.float32)
    x = x / max(width - 1, 1)
    y = y / max(height - 1, 1)

    # Slight diagonal bias follows the photograph's main architectural sweep.
    flow = np.clip(x * 0.86 + (1.0 - y) * 0.14, 0.0, 1.0)
    reveal = smoothstep(p - 0.08, p + 0.025, flow)
    reveal = 1.0 - reveal

    head = np.exp(-((flow - p) / 0.026) ** 2)
    trailing = np.exp(-np.maximum(flow - p, 0.0) / 0.08)
    trailing *= smoothstep(p - 0.20, p + 0.02, flow)
    trailing = 1.0 - trailing

    light_reveal = np.clip(np.maximum(reveal, trailing * 0.45) * light_mask, 0.0, 1.0)
    head_glow = np.clip(head * light_mask, 0.0, 1.0)

    # "Lights off" still preserves a faint building silhouette without leaving the light strips on.
    luminance = (0.2126 * final_rgb[..., 0] + 0.7152 * final_rgb[..., 1] + 0.0722 * final_rgb[..., 2])[..., None]
    off = final_rgb * (0.035 + luminance * 0.06)
    off *= 1.0 - light_mask[..., None] * 0.93

    lit = off * (1.0 - light_reveal[..., None]) + final_rgb * light_reveal[..., None]

    warm_color = np.array([1.0, 0.74, 0.42], dtype=np.float32)
    lit += head_glow[..., None] * warm_color * 0.38

    ambient = smoothstep(0.74, 1.0, p)
    lit = lit * (1.0 - ambient) + final_rgb * ambient

    return np.uint8(np.clip(lit, 0.0, 1.0) * 255.0)


def main():
    image = Image.open(SOURCE).convert("RGB")
    # H.264 needs even dimensions; this source already is even, but keep this future-proof.
    width, height = image.size
    image = image.crop((0, 0, width - width % 2, height - height % 2))

    final_rgb = np.asarray(image).astype(np.float32) / 255.0
    light_mask = make_light_mask(image)
    total_frames = int(FPS * DURATION_SECONDS)

    with imageio.get_writer(
        OUTPUT,
        fps=FPS,
        codec="libx264",
        quality=8,
        macro_block_size=2,
        ffmpeg_params=["-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    ) as writer:
        for frame_index in range(total_frames):
            writer.append_data(make_frame(final_rgb, light_mask, frame_index, total_frames))

    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
