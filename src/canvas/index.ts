import Two from 'two.js';
import TileStore from '../stores/TileStore';
import ToolStore from '../stores/ToolStore';
import { addMouseEvents } from './mouseEvents';
import Scene from './Scene';

export const init = ({ element, tools, tiles }: {
  element: HTMLElement,
  tools: ToolStore,
  tiles: TileStore,
}) => {
  const two = new Two({ autostart: true, fullscreen: true, domElement: element });
  
  const scene = new Scene(element, two.scene);
  
  addMouseEvents({ element, scene, tools, tiles });
};
