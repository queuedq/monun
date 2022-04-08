import Two from 'two.js';
import { addMouseEvents } from './mouseEvents';
import Scene from './Scene';

export const init = ({ element, tools }) => {
  const two = new Two({ autostart: true, fullscreen: true, domElement: element });
  
  const scene = new Scene(element, two.scene);
  
  addMouseEvents({ element, scene, tools });
};
