import { Cube } from './models/Cube.js';
import { Player } from './types/Player.js';
import { Vector3 } from './types/Vector3.js';
import { render } from './utils/Render.js';

const fov = 110;
const fps = 30; // ! 30
const gameTicks = 1000 / fps;

let player: Player;

console.log('init');

const cube = new Cube(100).model;
const cube2 = new Cube(100, new Vector3(0, 0, 200)).model;
const cube3 = new Cube(100, new Vector3(0, -100, 100)).model;

function update() {
  const x = parseFloat((document.getElementById('x') as HTMLInputElement).value.toString());
  const y = parseFloat((document.getElementById('y') as HTMLInputElement).value.toString());
  const z = parseFloat((document.getElementById('z') as HTMLInputElement).value.toString());
  cube.position = new Vector3(x, y, z);

  console.log(cube, cube2, cube3);

  render(player, [cube, cube2, cube3], fov);
}

function init() {
  player = new Player();
  player.bindKeys();
  const gameInterval = setInterval(update, gameTicks);
}

init();
