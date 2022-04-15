import { useEffect, useState } from 'react';
// import { setup } from '~/lib/web-audio.client';
import { setup } from '~/lib/ml5-pitch.client';

const Viz = () => {
  const [pitch, setPitch] = useState(0);

  useEffect(() => {
    console.log('vis effect');

    setup(setPitch);
  }, []);

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
