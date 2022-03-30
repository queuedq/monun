import { makeAutoObservable } from "mobx"

export default class ToolStore {
  selectedTool = 'TILE_DRAW'; // MOVE, TILE_DRAW, TILE_ERASE
  selectedTile = 'BLUE';

  constructor() {
    makeAutoObservable(this);
  }

  select(tool) {
    this.selectedTool = tool;
  }

  selectTile(tile) {
    this.selectedTool = 'TILE_DRAW';
    this.selectedTile = tile;
  }
}
