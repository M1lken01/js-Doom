import { Model } from './types/Model.js';
import { Vector3 } from './types/Vector3.js';
import { render } from './utils/Render.js';

const fov = 110;
const gameTicks = 100;

const player = {
  position: new Vector3(-50),
  facing: new Vector3(1),
};

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
    [0, 1, 2], // Front face
    [0, 2, 3], // Front face (continued)
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
  ],
  new Vector3(0, 0, 300),
  new Vector3(cubeSize / 2, cubeSize / 2, 10),
);

function update() {
  render([cube], fov);
}

const gameInterval = setInterval(update, gameTicks);
