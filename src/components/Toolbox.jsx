import React from 'react';
import { observer } from 'mobx-react-lite';
import * as style from './Toolbox.module.css';

const buttons = [
  {
    type: 'MOVE',
    text: 'Move',
  },
  {
    type: 'TILE_DRAW',
    text: 'Draw tile',
  },
  {
    type: 'TILE_ERASE',
    text: 'Erase tile',
  },
]

const Toolbox = ({ tools }) => {
  return (
    <div>
      {buttons.map(({ type, text }) => 
        <button
          key={type}
          onClick={() => tools.select(type)}
          className={tools.selectedTool == type ? style.selected : ''}
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default observer(Toolbox);
