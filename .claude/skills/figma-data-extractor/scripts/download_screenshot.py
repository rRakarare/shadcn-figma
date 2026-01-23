#!/usr/bin/env python3
"""
Download a screenshot from Figma using the REST API.

Requires FIGMA_ACCESS_TOKEN environment variable.

Usage:
    python download_screenshot.py <file_key> <node_id> <output_path>

Example:
    python download_screenshot.py p47Lwdw7tC0AaAT1ynftyS 2143:31510 ./screenshot.png
"""

import os
import sys
import urllib.request
import urllib.parse
import json
from pathlib import Path


def get_figma_image_url(file_key: str, node_id: str, token: str, scale: int = 2, format: str = "png") -> str:
    """Get export URL for a Figma node."""
    params = urllib.parse.urlencode({
        "ids": node_id,
        "scale": scale,
        "format": format
    })
    url = f"https://api.figma.com/v1/images/{file_key}?{params}"

    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)

    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())

    if data.get("err"):
        raise Exception(f"Figma API error: {data['err']}")

    images = data.get("images", {})
    image_url = images.get(node_id)

    if not image_url:
        raise Exception(f"No image URL returned for node {node_id}")

    return image_url


def download_image(url: str, output_path: Path) -> None:
    """Download image from URL to file."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(url, output_path)


def load_env_file():
    """Try to load .env file from current directory or parent directories."""
    current = Path.cwd()
    for _ in range(5):  # Check up to 5 levels
        env_file = current / '.env'
        if env_file.exists():
            with open(env_file) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        key = key.strip()
                        value = value.strip().strip('"').strip("'")
                        if key not in os.environ:
                            os.environ[key] = value
            return
        current = current.parent


def download_screenshot(file_key: str, node_id: str, output_path: str, scale: int = 2) -> str:
    """
    Download a Figma node as a screenshot.

    Args:
        file_key: Figma file key
        node_id: Node ID (format: "123:456" or "123-456")
        output_path: Where to save the image
        scale: Export scale (1-4)

    Returns:
        Path to saved file
    """
    # Try to load from .env file first
    load_env_file()

    token = os.environ.get("FIGMA_ACCESS_TOKEN")
    if not token:
        raise Exception(
            "FIGMA_ACCESS_TOKEN environment variable not set.\n"
            "Get your token at: https://www.figma.com/developers/api#access-tokens"
        )

    # Normalize node_id format (convert - to :)
    node_id = node_id.replace("-", ":")

    # Get the export URL
    print(f"Getting export URL for {file_key}/{node_id}...")
    image_url = get_figma_image_url(file_key, node_id, token, scale)

    # Download the image
    output = Path(output_path)
    print(f"Downloading to {output}...")
    download_image(image_url, output)

    print(f"Saved: {output} ({output.stat().st_size:,} bytes)")
    return str(output)


def main():
    if len(sys.argv) < 4:
        print("Usage: python download_screenshot.py <file_key> <node_id> <output_path> [scale]")
        print("\nRequires FIGMA_ACCESS_TOKEN environment variable.")
        print("\nExample:")
        print("  python download_screenshot.py p47Lwdw7tC0AaAT1ynftyS 2143:31510 ./screenshot.png")
        sys.exit(1)

    file_key = sys.argv[1]
    node_id = sys.argv[2]
    output_path = sys.argv[3]
    scale = int(sys.argv[4]) if len(sys.argv) > 4 else 2

    try:
        download_screenshot(file_key, node_id, output_path, scale)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
