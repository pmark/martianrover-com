import { useEffect } from 'react';
import { setup } from '~/lib/web-audio.client';

const Viz = () => {
  useEffect(() => {
    console.log('vis effect');

    setup();
  }, []);

  return (
    <>
      <h1>Viz</h1>
      <button id="btn-mute">Mute</button>
      <div className="wrapper">
        <canvas className="visualizer" width="640" height="100"></canvas>
      </div>
    </>
  );
};

export default Viz;
