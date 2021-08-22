import { makeAutoObservable } from "mobx"

export default class ToolStore {
  selectedTool = 'MOVE'; // MOVE, TILE_DRAW, TILE_ERASE

  constructor() {
    makeAutoObservable(this);
  }

  select(tool) {
    this.selectedTool = tool;
  }
}
