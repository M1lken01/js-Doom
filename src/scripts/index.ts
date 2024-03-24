import { Model } from './types/Model.js';
import { Player } from './types/Player.js';
import { Vector3 } from './types/Vector3.js';
import { render } from './utils/Render.js';

const fov = 110;
const fps = 30; // ! 30
const gameTicks = 1000 / fps;

let player: Player;

console.log('init');

const cubeSize = 100;
const cube = new Model(
  [
    new Vector3(0, 0, 0),
    new Vector3(0, cubeSize, 0),
    new Vector3(0, cubeSize, cubeSize),
    new Vector3(0, 0, cubeSize),
    new Vector3(cubeSize, 0, 0),
    new Vector3(cubeSize, cubeSize, 0),
    new Vector3(cubeSize, cubeSize, cubeSize),
    new Vector3(cubeSize, 0, cubeSize),
  ],
  [
    [4, 5, 6], // Back face
    [4, 6, 7], // Back face (continued)
    [0, 4, 7], // Left face
    [0, 7, 3], // Left face (continued)
    [1, 5, 6], // Right face
    [1, 6, 2], // Right face (continued)
    [0, 1, 5], // Top face
    [0, 5, 4], // Top face (continued)
    [2, 6, 7], // Bottom face
    [2, 7, 3], // Bottom face (continued)
    [0, 1, 2], // Front face
    [0, 2, 3], // Front face (continued)
  ],
  new Vector3(),
  new Vector3(cubeSize / 2, cubeSize / 2, cubeSize / 2),
);

function update() {
  const x = parseFloat((document.getElementById('x') as HTMLInputElement).value.toString());
  const y = parseFloat((document.getElementById('y') as HTMLInputElement).value.toString());
  const z = parseFloat((document.getElementById('z') as HTMLInputElement).value.toString());
  cube.position = new Vector3(x, y, z);

  render(player, [cube], fov);
}

function init() {
  player = new Player();
  player.bindKeys();
  const gameInterval = setInterval(update, gameTicks);
}

init();
