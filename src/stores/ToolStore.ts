import { makeAutoObservable } from "mobx";
import { Tool } from "../features/toolbox/tools";

export default class ToolStore {
  private selectedTool: Tool = "TILE_DRAW";
  selectedTile = "BLUE";
  tempMove = false;

  constructor() {
    makeAutoObservable(this);
  }

  select(tool: Tool) {
    this.selectedTool = tool;
  }

  selectTile(tileId: string) {
    this.selectedTool = "TILE_DRAW";
    this.selectedTile = tileId;
  }

  setTempMove(val: boolean) {
    this.tempMove = val;
  }

  /// Returns the currently selected tool,
  /// also considering whether the user temporarily switched to another tool.
  get currentTool(): Tool {
    return this.tempMove ? "MOVE" : this.selectedTool;
  }
}
