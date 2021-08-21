import React, { useEffect, useRef } from 'react';
import { init } from '../canvas';

const Canvas = () => {
  const ref = useRef();
  useEffect(setup, []);

  function setup() {
    init(ref.current);

    return () => {
      // TODO: cleanup
    }
  }

  return <div ref={ref}></div>;
}

export default Canvas;
