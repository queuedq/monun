interface TileBase {
  id: string;
}

export interface ImageTile extends TileBase {
  type: 'ImageTile';
  img: HTMLImageElement;
}

export interface ColorTile extends TileBase {
  type: 'ColorTile';
  color: string;
}

export type Tile = ImageTile | ColorTile;
