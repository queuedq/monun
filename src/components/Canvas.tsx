import * as React from 'react';
import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import ToolStore from '../stores/ToolStore';
import { init } from '../canvas';
import styles from './Canvas.module.css';

const styleCursor = (tools: ToolStore) => {
  return {
    cursor: tools.currentTool == 'MOVE' ? 'move' : 'auto',
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

  return (
    <canvas className={styles.canvas} style={styleCursor(tools)} ref={ref} />
  );
}

export default observer(Canvas);
