# Fire Mood Blueprint

## Overview
A minimalist "Fire Mood" web application that provides a relaxing fireplace experience with high-quality local video and audio.

## Features
- **Local Media**: Uses `fire.mp4` for both visual and audio content (YouTube API completely removed).
- **Immersive Transition**: "Start Relaxing" button unmutes the video and fades out the UI for a focused experience.
- **Controls**: Minimalist volume toggle and responsive design.

## Implementation Details
- **HTML**: Clean structure using `<video>` with `<source type="video/mp4">`.
- **CSS**: `object-fit: cover` for full-screen video background; smooth opacity transitions for the overlay.
- **JS**: Vanilla JavaScript to handle play/pause, volume, and UI state transitions.

## Project Status
- YouTube API dependencies removed.
- Media source consolidated to `fire.mp4`.
- Ready for deployment.
