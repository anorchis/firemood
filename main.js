// Load YouTube IFrame API

const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



let player;

let isMuted = false; // YouTube usually starts unmuted if user interaction allows, or muted if autoplay.

// We will start muted + paused or just paused, and wait for user click to play unmuted.



window.onYouTubeIframeAPIReady = function() {

  player = new YT.Player('player', {

    height: '100%',

    width: '100%',

    videoId: 'L_LUpnjgPso', // Fireplace 10 hours

    playerVars: {

      'autoplay': 0,       // Don't auto-start, wait for user

      'controls': 0,       // Hide controls

      'showinfo': 0,       // Hide info

      'modestbranding': 1, // Minimal branding

      'loop': 1,           // Loop

      'playlist': 'L_LUpnjgPso', // Required for loop

      'rel': 0,            // No related videos

      'iv_load_policy': 3, // Hide annotations

      'fs': 0              // No fullscreen button

    },

    events: {

      'onReady': onPlayerReady

    }

  });

};



function onPlayerReady(event) {

  const playBtn = document.getElementById('play-button');

  const overlay = document.getElementById('overlay');

  const controls = document.getElementById('controls');

  const volumeBtn = document.getElementById('volume-btn');



  playBtn.addEventListener('click', () => {

    // Play video

    player.playVideo();

    // Unmute (just in case)

    player.unMute();
 
    // 2. 배경을 완전히 투명하게 만들고 글자를 사라지게 함
    overlay.style.background = "transparent";
    document.getElementById('content').classList.add('fade-out');

    // Update UI

    document.body.classList.add('playing');

    playBtn.style.display = 'none'; // Hide start button

    controls.style.display = 'block'; // Show volume control

  });



  volumeBtn.addEventListener('click', () => {

    if (player.isMuted()) {

      player.unMute();

      updateVolumeIcon(false);

    } else {

      player.mute();

      updateVolumeIcon(true);

    }

  });

}



function updateVolumeIcon(muted) {

  const btn = document.getElementById('volume-btn');

  if (muted) {

    // Mute Icon

    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

  } else {

    // Volume Icon

    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;

  }

}