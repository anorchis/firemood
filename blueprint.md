# Fire Mood Blueprint

## Overview
A minimalist "Fire Mood" web application that provides a relaxing fireplace experience with high-quality local video/image and audio.

## Features
- **Optimized Media**: Uses `fire.webp` (animated WebP) for visuals to reduce load, and `fire.mp4` (hidden) for audio.
- **Immersive Transition**: "Start Relaxing" button unmutes the hidden audio and fades out the UI for a focused experience.
- **Controls**: Minimalist volume toggle and responsive design.

## Implementation Details
- **HTML**:
    - `<img src="fire.webp">` for the background visual.
    - `<video src="fire.mp4">` (hidden, opacity 0) for audio playback.
- **CSS**: `object-fit: cover` for full-screen visual; hidden video element.
- **JS**: Vanilla JavaScript to handle audio play/pause (targeting the hidden video element), volume, and UI state transitions.

## Project Status
- Switched to `fire.webp` for visuals as per user request.
- `fire.mp4` retained for audio track.
- Ready for deployment.