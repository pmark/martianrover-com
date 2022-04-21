import { useEffect, useState } from 'react';
// import { setup } from '~/lib/web-audio.client';
import { setup } from '~/lib/ml5-pitch.client';

import useAudioFFM from '~/lib/use-audio-ffm';
import useML5PitchDetection from '~/lib/use-ml5-detected-pitch';

const Viz = () => {
  const pitch = useML5DetectedPitch();
  const ffmData = useAudioFFM();

  return (
    <>
      <h1 className="text-5xl text-black">Om</h1>
      {/* <button id="btn-mute">Mute (not working)</button> */}
      <div className="wrapper">
        <div id="status">Loading...</div>
        <hr />
        <h4 id="pitch" className="text-3xl text-black">
          {pitch}
        </h4>
        <hr />
        <canvas className="visualizer" width="640" height="320"></canvas>
      </div>
    </>
  );
};

export default Viz;
