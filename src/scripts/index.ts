import { clearInterval } from 'timers';
import { Model } from './types/Model.js';
import { Vector2 } from './types/Vector2.js';
import { Vector3 } from './types/Vector3.js';
import { toDegrees, toRadians } from './utils/Math.js';
import { render } from './utils/Render.js';

const fov = 110;
const gameTicks = 100;
const stop = false;

const player = {
  position: new Vector3(-50),
  facing: new Vector3(1),
};

console.log('init');
let x = new Vector2();
console.log(x);
console.log(toRadians(60));
console.log(toDegrees(1));
const cube = new Model(
  [
    new Vector3(0, 0, 0),
    new Vector3(0, 20, 0),
    new Vector3(0, 20, 20),
    new Vector3(0, 0, 20),
    new Vector3(20, 0, 0),
    new Vector3(20, 20, 0),
    new Vector3(20, 20, 20),
    new Vector3(20, 0, 20),
  ],
  new Vector3(0, 100, 100),
  new Vector3(10, 10, 10),
);

function update() {
  render([cube], fov);
  if (stop) {
    clearInterval(gameInterval);
  }
}

const gameInterval = setInterval(update, gameTicks);
