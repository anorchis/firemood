let audioContext;
let audioBuffer;
let sourceNode;

// 1. 소리 파일 미리 로드 (페이지 로드 시 실행)
async function setupAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch('fire.m4a'); // 파일명이 정확해야 합니다!
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log("오디오 로드 완료: 이제 완벽한 루프가 가능합니다.");
    } catch (e) {
        console.error("오디오 로드 실패:", e);
    }
}
// 페이지 로드 시 미리 준비
window.addEventListener('load', setupAudio);
function playSeamless() {
    // 1. 안전장치: 소리 파일이 메모리에 올라왔는지 먼저 확인합니다.
    if (!audioBuffer) {
        alert("소리 파일이 아직 로드되지 않았습니다. 잠시만 기다려주세요!");
        return;
    }

    // 2. 중복 방지: 이미 재생 중인 소리가 있다면 멈춥니다.
    if (sourceNode) {
        sourceNode.stop();
    }

    // 3. 소리 소스 생성 및 설정
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true; // 8초마다 끊기지 않게 하드웨어 루프 설정

    // 4. 필터 설정 (날카로운 '타닥' 소리를 부드럽게 깎아줌)
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass'; 
    filter.frequency.value = 2000; // 2500 이하의 부드러운 소리만 통과
    filter.Q.value = 1;

    // 5. 오디오 연결망(Chain) 구축
    // [소스] -> [필터] -> [스피커(Destination)] 순서로 연결합니다.
    sourceNode.connect(filter);
    filter.connect(audioContext.destination);

    // 6. 재생 시작
    sourceNode.start(0);
    console.log("✅ 필터가 적용된 부드러운 장작 소리 무한 재생 시작");
}


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
    // 브라우저 보안 정책상 클릭 시점에 Resume 필요
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    playSeamless();

    /*if (player) {
    player.playVideo(); // YouTube 재생
    player.unMute();    // 소리 켜기
  }
    video.play();*/
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
    height: '0', // 소리만 필요하므로 크기를 0으로 설정 가능
    width: '0',
    videoId: 'L_LUpnjgPso', // 가져올 유튜브 영상 ID
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'L_LUpnjgPso' // 반복 재생용
    },
    events: {
      'onReady': (event) => {
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
