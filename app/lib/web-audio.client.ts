const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

const gainNode = audioCtx.createGain();

let canvas: HTMLCanvasElement | null;
const mute: HTMLElement | null = document.querySelector('#btn-mute');

export function setup() {
  console.log('setup!');

  audioSetup();
  canvasSetup();
  uiSetup();
}

function uiSetup() {
  if (mute) {
    mute.onclick = voiceMute;
  }
}

function canvasSetup() {
  // set up canvas context for visualizer

  canvas = document.querySelector('.visualizer');
  const canvasCtx = canvas?.getContext('2d');

  const intendedWidth = document.querySelector('.wrapper')?.clientWidth || 640;

  canvas?.setAttribute('width', String(intendedWidth));
}

let drawVisual = 0;

function audioSetup() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      // TODO: maybe move source up out of this scope
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      visualize();
    })
    .catch(function (err) {
      console.log('Mic access denied');
    });
}

function visualize() {
  if (!canvas) {
    console.log('no canvas');
    return;
  }

  const canvasCtx = canvas.getContext('2d');
  if (!canvasCtx) {
    console.log('no canvas context');
    return;
  }

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);
  const dataArray = new Float32Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    if (!canvasCtx) {
      console.log('no canvas context');
      return;
    }
    drawVisual = requestAnimationFrame(draw);

    analyser.getFloatFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let barHeight = (dataArray[i] + 140) * 2;

      canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  }

  draw();
}

function voiceMute() {
  if (!mute) {
    return;
  }
  if (mute.classList.contains('active')) {
    gainNode.gain.value = 1;
    mute.classList.remove('active');
    mute.innerHTML = 'Mute';
  } else {
    gainNode.gain.value = 0;
    mute.classList.add('active');
    mute.innerHTML = 'Unmute';
  }
}
