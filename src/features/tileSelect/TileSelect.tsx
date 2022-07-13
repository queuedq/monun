import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ColorTile, Tile } from '../../domain/tile';
import ToolStore from '../../stores/ToolStore';
import TileStore from '../../stores/TileStore';
import styles from './TileSelect.module.css';

interface TileSelectProps {
  tools: ToolStore;
  tiles: TileStore;
}

const TileSelect = ({ tools, tiles }: TileSelectProps) => {
  const ColorTileSelect = ({ id, color }: ColorTile) => (
    // TODO: implement tile select button UI
    <button
      key={id}
      onClick={() => tools.selectTile(id)}
      className={tools.selectedTile == id ? styles.selected : ''}
    >
      {color}
    </button>
  );

  return (
    <div>
      {Array.from(tiles.tileList.values()).map(tile => {
        switch (tile.type) {
          case 'ImageTile':
            return null; // TODO: ImageTile not implemented
          case 'ColorTile':
            return ColorTileSelect(tile);
        }
      })}
    </div>
  );
}

export default observer(TileSelect);
