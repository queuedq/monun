import * as React from 'react';
import Canvas from './Canvas';
import Sidebar from './Sidebar';
import Toolbox from '../features/toolbox/Toolbox';
import TileSelect from '../features/tileSelect/TileSelect';
import ToolStore from '../stores/ToolStore';
import { registerShortcuts } from '../features/shortcuts';

const tools = new ToolStore();

registerShortcuts(tools);

const App = () => {
  return (
    <div>
      <Canvas tools={tools} />
      <Toolbox tools={tools} />
      <Sidebar>
        <TileSelect tools={tools} />
      </Sidebar>
    </div>
  );
}

export default App;
