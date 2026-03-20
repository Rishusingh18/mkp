import os
from PIL import Image
import glob

def optimize_image(input_path, output_path, max_width=800, quality=80):
    try:
        with Image.open(input_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')
            if img.width > max_width:
                ratio = max_width / img.width
                new_size = (max_width, int(img.height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
                print(f"Resizing {input_path} to {new_size}")
            
            img.save(output_path, "WEBP", quality=quality)
            print(f"Successfully saved optimized image to {output_path}")
            
        os.remove(input_path)
        print(f"Removed original file: {input_path}")
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")

gallery_dir = r"c:\mkp\mkp-website\public\gallery"
files = glob.glob(os.path.join(gallery_dir, "*.jpeg")) + glob.glob(os.path.join(gallery_dir, "*.jpg")) + glob.glob(os.path.join(gallery_dir, "*.png"))

for file in files:
    filename = os.path.basename(file)
    name, ext = os.path.splitext(filename)
    dest_path = os.path.join(gallery_dir, f"{name}.webp")
    optimize_image(file, dest_path, max_width=800)
    
print("Done optimizing gallery files.")
