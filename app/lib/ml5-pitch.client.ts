// TODO: read https://29a.ch/2020/04/15/guitar-tuner
// Next: try https://gist.github.com/quimbs/9a7bf7ddd161dac727c6

import ml5 from 'ml5';

const modelPath = '/models/crepe';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let pitchDidChange: (arg0: any) => void;
let canvas: HTMLCanvasElement | null;
export let pitch: Promise<any> | undefined;

export async function setup(cb) {
  console.log('ml5 setup');
  pitchDidChange = cb;

  const audioContext = new AudioContext();
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  startPitch(stream, audioContext);
}

function startPitch(stream, audioContext) {
  pitch = ml5.pitchDetection(modelPath, audioContext, stream, modelLoaded);
  setInterval(integrate, 100);
}

let frequencySmoothingFactor = 0.0; // use this much of the current frequency when integratin the new one (0 - 1)
let smoothedFrequency = 0;
let latestFrequency = 0;

function integrate() {
  if (latestFrequency == -1) {
    return;
  }

  let result = 0;
  if (!smoothedFrequency) {
    smoothedFrequency = latestFrequency;
  }

  // if (latestFrequency > 0) {
  smoothedFrequency =
    smoothedFrequency * frequencySmoothingFactor +
    latestFrequency * (1.0 - frequencySmoothingFactor);
  result = smoothedFrequency;
  // }

  if (pitchDidChange) {
    pitchDidChange(Math.floor(result));
  }
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  if (!pitch) {
    return;
  }
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      // frequencySmoothingFactor = 0.05;
      latestFrequency = frequency;
    } else {
      // frequencySmoothingFactor = 0.6;
      latestFrequency = -1;
    }
    getPitch();
  });
}
