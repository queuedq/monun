import * as React from "react";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import Toolbox from "../features/toolbox/Toolbox";
import TileSelect from "../features/tileSelect/TileSelect";
import ToolStore from "../stores/ToolStore";
import TileStore from "../stores/TileStore";
import { registerShortcuts } from "../features/shortcuts";

const tools = new ToolStore();
const tiles = new TileStore();

registerShortcuts(tools);
tiles.loadDefaultTiles();

const App = () => {
  return (
    <>
      <Canvas tools={tools} tiles={tiles} />
      <Toolbox tools={tools} />
      <Sidebar>
        <TileSelect tools={tools} tiles={tiles} />
      </Sidebar>
    </>
  );
};

export default App;
