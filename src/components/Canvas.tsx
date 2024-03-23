import * as React from "react";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import ToolStore from "../stores/ToolStore";
import TileStore from "../stores/TileStore";
import { init } from "../canvas";
import styles from "./Canvas.module.css";

const styleCursor = (tools: ToolStore) => {
  return {
    cursor: tools.currentTool == "MOVE" ? "move" : "auto",
  };
};

interface CanvasProps {
  tools: ToolStore;
  tiles: TileStore;
}

const Canvas = ({ tools, tiles }: CanvasProps) => {
  const ref = useRef(null);
  useEffect(setup, []);

  function setup() {
    init({ canvasElement: ref.current!, tools, tiles });

    return () => {
      // TODO: cleanup
    };
  }

  return (
    <canvas className={styles.canvas} style={styleCursor(tools)} ref={ref} />
  );
};

export default observer(Canvas);
