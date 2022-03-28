import React from 'react';
import { observer } from 'mobx-react-lite';
import * as style from './TileSelect.module.css';

const tiles = [
  {
    id: 'BLUE',
    text: 'Blue',
  },
  {
    id: 'RED',
    text: 'Red',
  },
]

const TileSelect = ({ tools }) => {
  if (tools.selectedTool != 'TILE_DRAW') { return null; }

  return (
    <div>
      {tiles.map(({ id, text }) => 
        <button
          key={id}
          onClick={() => tools.selectTile(id)}
          className={tools.selectedTile == id ? style.selected : ''}
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default observer(TileSelect);
