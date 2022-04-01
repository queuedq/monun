import * as React from 'react';
import { observer } from 'mobx-react-lite';
import ToolStore from '../../stores/ToolStore';
import styles from './Toolbox.module.css';

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

interface ToolboxProps {
  tools: ToolStore;
}

const Toolbox = ({ tools }) => {
  return (
    <div className={styles.containerOut}>
      <div className={styles.containerIn}>
        {buttons.map(({ type, text }) => 
          <button
            key={type}
            onClick={() => tools.select(type)}
            className={tools.selectedTool == type ? styles.selected : ''}
          >
            {text}
          </button>
        )}
      </div>
    </div>
  );
}

export default observer(Toolbox);
