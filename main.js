document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('fire-audio');
  const playBtn = document.getElementById('play-button');
  const overlay = document.getElementById('overlay');
  const controls = document.getElementById('controls');
  const volumeBtn = document.getElementById('volume-btn');

  // Attempt to autoplay muted (browser policy usually requires mute for autoplay)
  video.muted = true;
  video.play().catch(error => {
    console.log("Autoplay prevented:", error);
  });

  playBtn.addEventListener('click', () => {
    // Unmute and play
    video.muted = false;
    video.play();
    updateVolumeIcon(false);

    // Update UI
    document.body.classList.add('playing');
    
    // Fade out button
    playBtn.style.transition = 'opacity 1.5s ease';
    playBtn.style.opacity = '0';
    playBtn.style.pointerEvents = 'none';
    
    // Fade out overlay background
    overlay.style.background = 'transparent'; 
    
    // Show controls
    controls.style.display = 'block';
  });

  volumeBtn.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      updateVolumeIcon(false);
    } else {
      video.muted = true;
      updateVolumeIcon(true);
    }
  });

  function updateVolumeIcon(muted) {
    const btn = volumeBtn; 
    if (muted) {
      // Mute Icon
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    } else {
      // Volume Icon
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
  }
});
