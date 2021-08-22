import Two from 'two.js';
import { addMouseEvents } from './mouseEvents';
import Scene from './Scene';

export const init = element => {
	const two = new Two({ autostart: true, fullscreen: true }).appendTo(element);
	
	const target = two.makeGroup();
	target.translation.set(two.width / 2, two.height / 2);
	const scene = new Scene(target);
	
	addMouseEvents({ element, scene });
};
