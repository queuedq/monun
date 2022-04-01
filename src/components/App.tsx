import * as React from 'react';
import Canvas from './Canvas';
import Toolbox from './toolbox/Toolbox';
import Sidebar from './sidebar/Sidebar';
import TileSelect from './sidebar/TileSelect';
import ToolStore from '../stores/ToolStore';

const tools = new ToolStore();

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
