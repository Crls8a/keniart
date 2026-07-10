#!/usr/bin/env python3
"""Optimize artwork images for local web delivery."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}
OUTPUT_EXTENSIONS = {"webp": ".webp", "jpeg": ".jpg", "png": ".png"}


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    if argv is None:
        argv = sys.argv[1:]

    argv = [argument for argument in argv if argument != "--"]

    parser = argparse.ArgumentParser(
        description="Optimize artwork photos into web-friendly image assets."
    )
    parser.add_argument(
        "--input",
        "-i",
        type=Path,
        default=Path("public/artworks/incoming"),
        help="Source directory with original images. Defaults to public/artworks/incoming.",
    )
    parser.add_argument(
        "--output",
        "-o",
        type=Path,
        default=Path("public/artworks/optimized"),
        help="Output directory for optimized assets. Defaults to public/artworks/optimized.",
    )
    parser.add_argument(
        "--max-size",
        type=int,
        default=2200,
        help="Maximum long edge in pixels. Images are never upscaled. Defaults to 2200.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=84,
        help="Output quality for WebP/JPEG, from 1 to 100. Defaults to 84.",
    )
    parser.add_argument(
        "--format",
        choices=sorted(OUTPUT_EXTENSIONS),
        default="webp",
        help="Output format. Defaults to webp.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned output without writing files.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Replace existing optimized files.",
    )
    return parser.parse_args(argv)


def discover_images(input_dir: Path) -> list[Path]:
    return sorted(
        path
        for path in input_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def output_path_for(source: Path, input_dir: Path, output_dir: Path, image_format: str) -> Path:
    relative_path = source.relative_to(input_dir)
    return output_dir / relative_path.with_suffix(OUTPUT_EXTENSIONS[image_format])


def normalized_image(image: Image.Image, image_format: str) -> Image.Image:
    image = ImageOps.exif_transpose(image)

    if image_format == "jpeg" and image.mode in {"RGBA", "LA", "P"}:
        background = Image.new("RGB", image.size, "white")
        if image.mode == "P":
            image = image.convert("RGBA")
        background.paste(image, mask=image.getchannel("A") if "A" in image.getbands() else None)
        return background

    if image_format in {"jpeg", "webp"} and image.mode not in {"RGB", "RGBA"}:
        return image.convert("RGB")

    return image.copy()


def resize_without_upscale(image: Image.Image, max_size: int) -> Image.Image:
    if max(image.size) <= max_size:
        return image

    resized = image.copy()
    resized.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
    return resized


def save_image(image: Image.Image, destination: Path, image_format: str, quality: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)

    save_options: dict[str, object] = {}
    if image_format == "webp":
        save_options.update({"quality": quality, "method": 6})
    elif image_format == "jpeg":
        save_options.update({"quality": quality, "optimize": True, "progressive": True})
    elif image_format == "png":
        save_options.update({"optimize": True})

    image.save(destination, format=image_format.upper(), **save_options)


def optimize_image(
    source: Path,
    destination: Path,
    image_format: str,
    max_size: int,
    quality: int,
    dry_run: bool,
    overwrite: bool,
) -> str:
    if destination.exists() and not overwrite:
        return f"skip existing: {destination}"

    with Image.open(source) as original:
        image = normalized_image(original, image_format)
        image = resize_without_upscale(image, max_size)
        original_size = f"{original.width}x{original.height}"
        output_size = f"{image.width}x{image.height}"

        if dry_run:
            return f"would write: {source} -> {destination} ({original_size} -> {output_size})"

        save_image(image, destination, image_format, quality)
        return f"wrote: {destination} ({original_size} -> {output_size})"


def main() -> int:
    args = parse_args()

    if args.max_size < 1:
        print("--max-size must be greater than 0", file=sys.stderr)
        return 2

    if not 1 <= args.quality <= 100:
        print("--quality must be between 1 and 100", file=sys.stderr)
        return 2

    input_dir = args.input.resolve()
    output_dir = args.output.resolve()

    if not input_dir.exists() or not input_dir.is_dir():
        print(f"Input directory does not exist: {input_dir}", file=sys.stderr)
        return 1

    images = discover_images(input_dir)
    if not images:
        print(f"No supported images found in {input_dir}")
        return 0

    for source in images:
        destination = output_path_for(source, input_dir, output_dir, args.format)
        try:
            print(
                optimize_image(
                    source=source,
                    destination=destination,
                    image_format=args.format,
                    max_size=args.max_size,
                    quality=args.quality,
                    dry_run=args.dry_run,
                    overwrite=args.overwrite,
                )
            )
        except OSError as error:
            print(f"failed: {source} ({error})", file=sys.stderr)
            return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
