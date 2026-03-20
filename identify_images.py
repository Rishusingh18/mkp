from PIL import Image
import os

files = [
    r"C:\Users\ASUS\.gemini\antigravity\brain\bb5a6379-9a92-41e0-b614-c1801e07e4e1\media__1774032866120.jpg",
    r"C:\Users\ASUS\.gemini\antigravity\brain\bb5a6379-9a92-41e0-b614-c1801e07e4e1\media__1774032888883.png",
    r"C:\Users\ASUS\.gemini\antigravity\brain\bb5a6379-9a92-41e0-b614-c1801e07e4e1\media__1774033899738.png",
    r"C:\Users\ASUS\.gemini\antigravity\brain\bb5a6379-9a92-41e0-b614-c1801e07e4e1\media__1774034461693.png"
]

for f in files:
    try:
        with Image.open(f) as img:
            print(f"{os.path.basename(f)}: format={img.format}, size={img.size}")
    except Exception as e:
        print(f"Error opening {os.path.basename(f)}: {e}")
