import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { init } from '../canvas';

const Canvas = ({ tools }) => {
  const ref = useRef();
  useEffect(setup, []);

  function setup() {
    init({ element: ref.current, tools });

    return () => {
      // TODO: cleanup
    }
  }

  return <div ref={ref}></div>;
}

export default observer(Canvas);
