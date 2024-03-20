import { Group } from "two.js/src/group";
import { Path } from "two.js/src/path";
import { Line } from "two.js/src/shapes/line";
import Camera from "./Camera";
import { TILE_SIZE } from "./constants";

export default class Grid {
  layer: Group;
  lines: Array<Path>;

  constructor() {
    this.layer = new Group();
    this.layer.opacity = 0.15;

    this.lines = [];
  }

  update = (cam: Camera) => {
    const {pos, width, height} = cam.visibleRect;
    
    let gridScale = 1;
    if (cam.scale < 0.5) gridScale = 4;
    
    const grid = TILE_SIZE * gridScale;
    const radius = 4 / Math.sqrt(cam.scale / gridScale);

    const xs = Math.floor(pos.x / grid);
    const xe = Math.ceil((pos.x + width) / grid);
    const ys = Math.floor(pos.y / grid);
    const ye = Math.ceil((pos.y + height) / grid);
    const cnt = (xe-xs+1) + (ye-ys+1);

    while (this.lines.length < cnt) {
      this.lines.push(Grid.makeLine(this.layer));
    }
    
    let i = 0;
    for (let x = xs; x <= xe; x++, i++) {
      this.lines[i].vertices[0].x = x * grid;
      this.lines[i].vertices[0].y = ys * grid;
      this.lines[i].vertices[1].x = x * grid;
      this.lines[i].vertices[1].y = ye * grid;
      
      this.lines[i].linewidth = 1 / cam.scale;
      this.lines[i].dashes = [radius, grid - radius * 2, radius, 0];
      this.lines[i].visible = true;
    }
    for (let y = ys; y <= ye; y++, i++) {
      this.lines[i].vertices[0].x = xs * grid;
      this.lines[i].vertices[0].y = y * grid;
      this.lines[i].vertices[1].x = xe * grid;
      this.lines[i].vertices[1].y = y * grid;
      
      this.lines[i].linewidth = 1 / cam.scale;
      this.lines[i].dashes = [radius, grid - radius * 2, radius, 0];
      this.lines[i].visible = true;
    }

    // Hide unused lines
    for (; i < this.lines.length; i++) {
      this.lines[i].visible = false;
    }
  }

  private static makeLine(group: Group): Path {
    const line = new Line(0, 0, 0, 0);
    line.stroke = '#000000';
    line.addTo(group);
    return line;
  }
}
