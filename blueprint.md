# Fire Mood Blueprint

## Overview

This project creates a "Fire Mood" web application that displays a looping fireplace video with sound, allowing users to relax. It features a start screen with a "Start Relaxing" button and a volume control.

## Implemented Features & Design

### Initial Version (YouTube API)

*   Initially used YouTube IFrame API for the background video.
*   Featured a semi-transparent overlay with a "Start Relaxing" button.

### Current Version (Local Video)

*   **Video Integration**:
    *   Switched from YouTube API to a local `fire.mp4` file for better performance and control.
    *   Uses HTML5 `<video>` tag with `<source src="fire.mp4" type="video/mp4">`.
    *   Configured for `loop`, `playsinline`, and `muted` autoplay (muted by default to comply with browser policies).
*   **CSS Styling (`style.css`)**:
    *   Full-page video background using `object-fit: cover` to ensure it fills the viewport.
    *   Overlay and content styling maintained from the initial version.
    *   Added smooth transitions for UI elements.
*   **JavaScript Logic (`main.js`)**:
    *   Handles local video playback.
    *   Attempts muted autoplay on load.
    *   "Start Relaxing" button unmutes the video, starts playback if needed, and fades out the UI.
    *   Includes volume toggle functionality with dynamic icon updates.

## Current Plan & Steps

1.  **Switch to Local Video**: Replaced YouTube iframe with HTML5 `<video>` element. (Completed)
2.  **Add Source Tag**: Updated `<video>` tag to use `<source>` for better compatibility. (Completed)
3.  **Update Logic**: Refactored `main.js` to control the local video element instead of the YouTube player. (Completed)