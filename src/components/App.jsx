import React from 'react';
import Canvas from './Canvas';
import Toolbox from './Toolbox';
import ToolStore from '../stores/ToolStore';

const tools = new ToolStore();

const App = () => {
  return (
    <div>
      <Canvas tools={tools} />
      <div style={{position: 'absolute'}}>
        <Toolbox tools={tools} />
      </div>
    </div>
  );
}

export default App;
