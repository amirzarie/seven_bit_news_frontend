# Demo Video

## 📹 About the Demo

This folder contains the demonstration video (`demo.mp4`) showcasing Seven Bit News in action.

**Video Details:**
- Duration: ~90 seconds
- Content: Full walkthrough of the application features
- Shows: AI chat, visualizations, sentiment analysis, trending news

## 🎬 For GitHub README Display

### Option 1: Commit Video to Repository (Current Setup)

The video is already referenced in the main README.md. When you push to GitHub:

```bash
git add demo/demo.mp4
git commit -m "docs: add demo video"
git push
```

The video should display in the README on GitHub.

### Option 2: GitHub Video Upload (Recommended for Large Files)

For better performance, you can upload the video directly to GitHub:

1. Go to your GitHub repository
2. Create or edit an issue/PR
3. Drag and drop `demo.mp4` into the comment box
4. GitHub will upload it and give you a URL like:
   ```
   https://user-images.githubusercontent.com/YOUR_ID/VIDEO_ID.mp4
   ```
5. Copy this URL and update the README.md video source:
   ```html
   <video src="YOUR_GITHUB_VIDEO_URL" width="80%" controls></video>
   ```

### Option 3: YouTube Upload (Best for Large Files)

Upload the demo to YouTube and embed it:

1. Upload `demo.mp4` to YouTube
2. Get the video ID from the URL
3. Update README.md with:
   ```markdown
   [![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
   ```

## 📊 Video File Size

Current video size: Check with:
```bash
# Windows
dir demo.mp4

# Mac/Linux
ls -lh demo.mp4
```

**Note**: GitHub has a 100MB file size limit. If your video exceeds this:
- Use Option 2 (GitHub's video upload) which supports larger files
- Use Option 3 (YouTube)
- Compress the video using a tool like HandBrake

## 🔄 Updating the Demo

To replace the demo video:

1. Replace `demo.mp4` with your new video
2. Keep the same filename to avoid updating the README
3. Commit and push:
   ```bash
   git add demo/demo.mp4
   git commit -m "docs: update demo video"
   git push
   ```

---

**Need help?** Check [GitHub's video support documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files)
