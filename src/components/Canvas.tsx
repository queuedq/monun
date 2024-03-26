import * as React from "react";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import ToolStore from "../stores/tool-store";
import TileStore from "../stores/tile-store";
import { init } from "../canvas";

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
    <canvas className="w-full h-full" style={styleCursor(tools)} ref={ref} />
  );
};

export default observer(Canvas);
