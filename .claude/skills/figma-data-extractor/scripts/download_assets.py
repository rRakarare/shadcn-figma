#!/usr/bin/env python3
"""
Download Figma assets from MCP asset URLs.

Reads asset URLs from a file and downloads them to a specified directory.

Usage:
    python download_assets.py <urls_file> <output_dir>

Example:
    python download_assets.py assets/asset-urls.txt ./assets
"""

import sys
import os
import urllib.request
import urllib.error
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed


def extract_asset_id(url: str) -> str:
    """Extract the asset ID from a Figma MCP asset URL."""
    # URL format: https://www.figma.com/api/mcp/asset/{uuid}
    return url.split('/')[-1]


def download_asset(url: str, output_dir: Path) -> tuple[str, bool, str]:
    """
    Download a single asset.

    Returns: (asset_id, success, message)
    """
    asset_id = extract_asset_id(url)
    output_path = output_dir / f"{asset_id}.png"

    try:
        # Download with a timeout
        request = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            content = response.read()

            # Check if we got valid image data
            if len(content) < 100:
                return (asset_id, False, "Response too small, likely an error")

            with open(output_path, 'wb') as f:
                f.write(content)

            return (asset_id, True, f"Downloaded {len(content)} bytes")

    except urllib.error.HTTPError as e:
        return (asset_id, False, f"HTTP Error {e.code}: {e.reason}")
    except urllib.error.URLError as e:
        return (asset_id, False, f"URL Error: {e.reason}")
    except Exception as e:
        return (asset_id, False, f"Error: {str(e)}")


def download_assets(urls_file: str, output_dir: str, max_workers: int = 5) -> dict:
    """
    Download all assets from URLs file.

    Returns dict with download statistics.
    """
    urls_path = Path(urls_file)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Read URLs
    with open(urls_path, 'r', encoding='utf-8') as f:
        urls = [line.strip() for line in f if line.strip()]

    result = {
        'total': len(urls),
        'success': 0,
        'failed': 0,
        'downloaded': [],
        'errors': []
    }

    print(f"Downloading {len(urls)} assets...")

    # Download with thread pool for parallel downloads
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(download_asset, url, output_path): url
            for url in urls
        }

        for future in as_completed(futures):
            asset_id, success, message = future.result()

            if success:
                result['success'] += 1
                result['downloaded'].append(asset_id)
                print(f"  OK: {asset_id}")
            else:
                result['failed'] += 1
                result['errors'].append({'asset_id': asset_id, 'error': message})
                print(f"  FAILED: {asset_id} - {message}")

    return result


def main():
    if len(sys.argv) < 3:
        print("Usage: python download_assets.py <urls_file> <output_dir>")
        print("Example: python download_assets.py assets/asset-urls.txt ./assets")
        sys.exit(1)

    urls_file = sys.argv[1]
    output_dir = sys.argv[2]

    if not os.path.exists(urls_file):
        print(f"Error: URLs file not found: {urls_file}")
        sys.exit(1)

    result = download_assets(urls_file, output_dir)

    print(f"\nDownload complete:")
    print(f"  Total: {result['total']}")
    print(f"  Success: {result['success']}")
    print(f"  Failed: {result['failed']}")


if __name__ == '__main__':
    main()
