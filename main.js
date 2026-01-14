document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('play-button');
  const overlay = document.getElementById('overlay');

  playBtn.addEventListener('click', () => {
    // Just fade out UI for immersion
    
    // Fade out button
    playBtn.style.transition = 'opacity 1.5s ease';
    playBtn.style.opacity = '0';
    playBtn.style.pointerEvents = 'none';
    
    // Fade out overlay background
    overlay.style.background = 'transparent'; 
  });
});