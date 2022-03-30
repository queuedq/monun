import * as React from 'react';
import Canvas from './Canvas';
import Toolbar from './toolbar/Toolbar';
import Toolbox from './toolbar/Toolbox';
import Sidebar from './sidebar/Sidebar';
import TileSelect from './sidebar/TileSelect';
import ToolStore from '../stores/ToolStore';

const tools = new ToolStore();

const App = () => {
  return (
    <div>
      <Canvas tools={tools} />
      <Toolbar>
        <Toolbox tools={tools} />
      </Toolbar>
      <Sidebar>
        <TileSelect tools={tools} />
      </Sidebar>
    </div>
  );
}

export default App;
