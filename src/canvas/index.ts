import Two from 'two.js';
import TileStore from '../stores/TileStore';
import ToolStore from '../stores/ToolStore';
import { addMouseEvents } from './mouseEvents';
import Scene from './Scene';

export const init = ({ canvasElement, tools, tiles }: {
  canvasElement: HTMLElement,
  tools: ToolStore,
  tiles: TileStore,
}) => {
  const two = new Two({ autostart: true, fullscreen: true, domElement: canvasElement });
  
  const scene = new Scene(canvasElement, two.scene);
  
  addMouseEvents({ canvasElement, scene, tools, tiles });
};
