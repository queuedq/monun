import * as React from 'react';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { init } from '../canvas';

const styleCursor = tools => {
  return {
    cursor: tools.selectedTool == 'MOVE' ? 'move' : 'auto',
  }
}

const Canvas = ({ tools }) => {
  const ref = useRef();
  useEffect(setup, []);

  function setup() {
    init({ element: ref.current, tools });

    return () => {
      // TODO: cleanup
    }
  }

  return <div style={styleCursor(tools)} ref={ref}></div>;
}

export default observer(Canvas);
