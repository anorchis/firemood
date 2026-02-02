

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('fire-video');
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
    if (player) {
    player.playVideo(); // YouTube 재생
    player.unMute();    // 소리 켜기
  }
    video.muted = true;
    video.play()
    updateVolumeIcon(false);
    
    document.getElementById('controls').style.display = 'block';
  
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
    if (player) {
    if (player.isMuted()) {
      player.unMute(); // 음소거 해제
      updateVolumeIcon(false);
    } else {
      player.mute();   // 음소거
      updateVolumeIcon(true);
    }
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
let player;

// 1. API가 준비되면 실행되는 함수
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('player', {
    height: '1', // 소리만 필요하므로 크기를 0으로 설정 가능
    width: '1',
    videoId: 'L_LUpnjgPso', // 가져올 유튜브 영상 ID
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'L_LUpnjgPso', // 반복 재생용
      'origin': window.location.origin
    },
    events: {
      'onReady': (event) => {
        event.target.setVolume(100);
        // 준비 완료 시점에 실행할 동작
      }
    }
  });
};

// 2. 소리를 재생하고 음소거를 해제하는 함수
function playSound() {
  if (player) {
    player.playVideo();
    player.unMute(); // 소리 켜기
  }
}

// 3. 소리를 끄는 함수 (음소거)
function muteSound() {
  if (player) {
    player.mute();
  }
}