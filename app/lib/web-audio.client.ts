// TODO: read https://29a.ch/2020/04/15/guitar-tuner
// Next: try https://gist.github.com/quimbs/9a7bf7ddd161dac727c6

//
let luat = 0;
//

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
console.log('sample rate:', audioCtx.sampleRate);

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 32; // 2048;
// analyser.minDecibels = -90;
// analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

const gainNode = audioCtx.createGain();
gainNode.gain.value = 0;

let canvas: HTMLCanvasElement | null;
const mute: HTMLElement | null = document.querySelector('#btn-mute');
const uiFreq: HTMLElement | null = document.querySelector('#freq');

const DrawAllFrequencies = true;

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
      const source = audioCtx.createMediaStreamSource(stream);
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.value = 2000; // setValueAtTime(1000, 0);
      filter.Q.value = 0; //setValueAtTime(0, 0);

      source.connect(filter);
      filter.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      visualize();
    })
    .catch(function (err) {
      console.log('Mic access denied', err);
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

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Float32Array(bufferLength);
  // const dataArray = new Uint8Array(bufferLength);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    if (!canvasCtx) {
      console.log('no canvas context');
      return;
    }
    if (uiFreq) {
      const p = detectPitch();
      uiFreq.innerHTML = String(Math.floor(p));
    }
    drawVisual = requestAnimationFrame(draw);

    analyser.getFloatFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    const minOffset = 50; //-Math.min(...dataArray);
    const heightScale = 2;

    if (DrawAllFrequencies) {
      for (let i = 0; i < bufferLength; i++) {
        const frequency = dataArray[i] + minOffset;

        const barHeight = frequency * heightScale;

        canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    } else {
      const max = Math.max(...dataArray);
      const index = dataArray.indexOf(max);
      const barHeight = (max + minOffset) * heightScale;
      x = index * (barWidth + 1);
      canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)';
      canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      if (uiFreq) {
        uiFreq.innerHTML = String(Math.floor(max));
      }
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

/////////////////////////////////////////////

function detectPitch() {
  var inputBuffer = new Float32Array(analyser.frequencyBinCount);
  var outputBuffer = new Float32Array(analyser.frequencyBinCount);

  // Perform autocorrelation on input signal
  analyser.getFloatFrequencyData(inputBuffer);
  xcorr(inputBuffer, outputBuffer);
  let now = new Date().getTime();
  if (now - luat < 5000) {
    return;
  }
  console.log(inputBuffer, '\n\n', outputBuffer);
  luat = now;

  // Find peaks
  const locations = findpeaks(outputBuffer);

  // Calculate frequency from median value of distances between peaks
  const diffs = diff(locations);
  const freq = audioCtx.sampleRate / median(diffs);

  return freq;
}

function xcorr(input, output) {
  var n = input.length,
    norm = 0,
    sum,
    i,
    j;

  for (i = 0; i < n; i++) {
    sum = 0;
    for (j = 0; j < n; j++) {
      sum += input[j] * (input[j + i] || 0); // Pad input with zeroes
    }
    if (i === 0) norm = sum;
    output[i] = sum / norm;
  }
}

function findpeaks(data) {
  const locations = [0];

  for (let i = 1; i < data.length - 1; i++) {
    if (data[i] > 0 && data[i - 1] < data[i] && data[i] > data[i + 1]) {
      locations.push(i);
    }
  }

  return locations;
}

function diff(data) {
  return data
    .reduce(function (acc, value, i) {
      acc[i] = data[i] - data[i - 1];
      return acc;
    }, [])
    .slice(1);
}

function mean(data) {
  return (
    data.reduce(function (acc, value) {
      return acc + value;
    }, 0) / data.length
  );
}

function median(data) {
  data.sort(function (a, b) {
    return a - b;
  });
  const half = Math.floor(data.length / 2);

  if (data.length % 2) return data[half];
  else return (data[half - 1] + data[half]) / 2.0;
}

//////////////////////////////
/*
const detectPitch = () => {
  var buffer = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(buffer);
  return findFundamentalFreq(buffer, audioCtx.sampleRate);
};

const findFundamentalFreq = (buffer, sampleRate) => {
  // We use Autocorrelation to find the fundamental frequency.

  // In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away.
  // The autocorrelation index will be the average of these products. At the same time, we normalize the values.
  // Source: http://www.phy.mty.edu/~suits/autocorrelation.html
  // Assuming the sample rate is 48000Hz, a 'k' equal to 1000 would correspond to a 48Hz signal (48000/1000 = 48),
  // while a 'k' equal to 8 would correspond to a 6000Hz one, which is enough to cover most (if not all)
  // the notes we have in the notes.json file.
  var n = 1024,
    bestR = 0,
    bestK = -1;
  for (var k = 8; k <= 1000; k++) {
    var sum = 0;

    for (var i = 0; i < n; i++) {
      sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
    }

    var r = sum / (n + k);

    if (r > bestR) {
      bestR = r;
      bestK = k;
    }

    if (r > 0.9) {
      // Let's assume that this is good enough and stop right here
      break;
    }
  }

  if (bestR > 0.0025) {
    // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
    var fundamentalFreq = sampleRate / bestK;
    return fundamentalFreq;
  } else {
    // We haven't found a good correlation
    return -1;
  }
};
*/
////////
