import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faSquare
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsUpDownLeftRight,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import ToolStore from '../../stores/ToolStore';
import classnames from 'classnames';
import styles from './Toolbox.module.scss';

// TODO: extract button definition into another file
interface ButtonDefinition {
  type: string, // TODO: use proper type
  text: string,
  icon: IconProp,
  shortcut: string,
}

const buttons: Array<ButtonDefinition> = [
  {
    type: 'MOVE',
    text: 'Move',
    icon: faArrowsUpDownLeftRight,
    shortcut: 'Q',
  },
  {
    type: 'TILE_DRAW',
    text: 'Draw tile',
    icon: faSquare,
    shortcut: 'W',
  },
  {
    type: 'TILE_ERASE',
    text: 'Erase tile',
    icon: faEraser,
    shortcut: 'E',
  },
]

interface ToolboxProps {
  tools: ToolStore;
}

const Toolbox = ({ tools }: ToolboxProps) => {
  return (
    <div className={styles.containerOut}>
      <div className={styles.containerIn}>
        {buttons.map(({ type, text, icon, shortcut }) => 
          <button
            key={type}
            onClick={() => tools.select(type)}
            className={classnames(
              styles.button,
              tools.selectedTool == type ? styles.selected : null
            )}
          >
            <div className={styles.shortcutBadge}>{shortcut}</div>
            <FontAwesomeIcon icon={icon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default observer(Toolbox);
