import os
import glob
import subprocess
try:
    import imageio_ffmpeg
except ImportError:
    print("Please install imageio-ffmpeg")
    exit(1)

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

videos_dir = r"c:\mkp\mkp-website\public\gallery\videos"
videos = glob.glob(os.path.join(videos_dir, "*.mp4"))

for video in videos:
    print(f"Processing {video}...")
    temp_output = video.replace(".mp4", "_muted.mp4")
    
    cmd = [ffmpeg_exe, "-y", "-i", video, "-c", "copy", "-an", temp_output]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    if os.path.exists(temp_output) and os.path.getsize(temp_output) > 0:
        os.replace(temp_output, video)
        print(f"Successfully stripped audio from {video}")
    else:
        print(f"Failed to process {video}")

print("Done stripping audio.")
