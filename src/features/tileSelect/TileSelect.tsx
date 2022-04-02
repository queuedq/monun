import * as React from 'react';
import { observer } from 'mobx-react-lite';
import ToolStore from '../../stores/ToolStore';
import styles from './TileSelect.module.css';

const tiles = [
  {
    id: 'BLUE',
    text: 'Blue',
  },
  {
    id: 'RED',
    text: 'Red',
  },
];

interface TileSelectProps {
  tools: ToolStore;
}

const TileSelect = ({ tools }: TileSelectProps) => {
  return (
    <div>
      {tiles.map(({ id, text }) => 
        <button
          key={id}
          onClick={() => tools.selectTile(id)}
          className={tools.selectedTile == id ? styles.selected : ''}
        >
          {text}
        </button>
      )}
    </div>
  );
}

export default observer(TileSelect);