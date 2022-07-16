import * as React from 'react';
import classnames from 'classnames';
import { ColorTile } from "../../domain/tile";
import styles from './TileButtons.module.scss';

interface ColorTileButtonProps {
  tile: ColorTile,
  selected: boolean,
  onClick: () => void,
}

export const ColorTileButton = ({
  tile, selected, onClick
}: ColorTileButtonProps) => (
  <button
    onClick={onClick}
    className={classnames(
      styles.btn,
      {[styles.selected]: selected }
    )}
    style={{ backgroundColor: tile.color }}
  >
    {tile.id}
  </button>
);
