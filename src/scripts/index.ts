import { Model } from './types/Model.js';
import { Vector2 } from './types/Vector2.js';
import { Vector3 } from './types/Vector3.js';
import { toDegrees, toRadians } from './utils/Math.js';
import { drawVertex, getOnScreen } from './utils/Render.js';

export const fov = 110;

console.log('init');
let x = new Vector2();
console.log(x);
console.log(toRadians(60));
console.log(toDegrees(1));
const cube = new Model([
  new Vector3(0, 0, 0),
  new Vector3(0, 20, 0),
  new Vector3(0, 20, 20),
  new Vector3(0, 0, 20),
  new Vector3(20, 0, 0),
  new Vector3(20, 20, 0),
  new Vector3(20, 20, 20),
  new Vector3(20, 0, 20),
]);

for (let i = 0; i < cube.vertices.length; i++) {
  drawVertex(getOnScreen(cube.vertices[i]));
}
