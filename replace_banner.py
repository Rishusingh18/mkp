import os
from PIL import Image

output_path = r"c:\mkp\mkp-website\public\mkp-packers-movers-banner.webp"
# We will use the JPG artifact from previous session since it has the exact timestamp
input_path = r"C:\Users\ASUS\.gemini\antigravity\brain\bb5a6379-9a92-41e0-b614-c1801e07e4e1\media__1774032866120.jpg"

try:
    with Image.open(input_path) as img:
        img = img.convert("RGB")
        # Resize according to 100KB rule aspect ratio (display size)
        img.thumbnail((800, 1200), Image.Resampling.LANCZOS)
        img.save(output_path, "WEBP", quality=85)
        print(f"Successfully converted to {os.path.getsize(output_path)} bytes")
except Exception as e:
    print(f"Failed to convert: {e}")
