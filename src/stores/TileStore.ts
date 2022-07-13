import { makeAutoObservable } from "mobx"
import { Tile } from "../domain/tile";
import { defaultTiles } from "../features/tileSelect/defaultTiles";

export default class TileStore {
  tileList: Map<string, Tile> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  loadDefaultTiles() {
    defaultTiles.forEach(tile => this.tileList.set(tile.id, tile));
  }

  setImageTile(id: string, img: HTMLImageElement) {
    this.tileList.set(id, { id, type: 'ImageTile', img });
  }

  removeTile(id: string) {
    this.tileList.delete(id);
  }

  /// (computed with argument)
  getTile(id: string): Tile | undefined {
    if (this.tileList.has(id)) return this.tileList.get(id);
    return undefined;
  }
}
