import { useRef, useEffect } from 'react';

export default function useInterval(
  callback: (() => void) | any,
  delay: number | null | undefined
): void {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') {
        const fn = savedCallback.current as Function;
        fn();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
