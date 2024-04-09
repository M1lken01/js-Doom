import { Cube } from './models/Cube.js';
import { Player } from './types/Player.js';
import { Vector3 } from './types/Vector3.js';
import { render } from './utils/Render.js';
import { parseObjFile } from './utils/ObjectLoader.js';
import { Model } from './types/Model.js';
import { toRadians } from './utils/Math.js';

const fov = 110;
const fps = 1; // ! 30
const gameTicks = 1000 / fps;

let player: Player;

console.log('init');

let [q, w, e] = [0, 0, 0];

const cube = new Cube(100, new Vector3(), '#0ff').model;
const cube2 = new Cube(100, new Vector3(0, 0, 200), '#00f').model;
const cube3 = new Cube(100, new Vector3(0, -100, 100)).model;
const cubeC = new Model(
  [
    new Vector3(0, 0, 0),
    new Vector3(0, 100, 0),
    new Vector3(0, 100, 100),
    new Vector3(0, 0, 100),
    new Vector3(100, 0, 0),
    new Vector3(100, 100, 0),
    new Vector3(100, 100, 100),
    new Vector3(100, 0, 100),
  ],
  [
    { vertices: [4, 5, 6], color: 'lime' }, // Back face
    { vertices: [4, 6, 7], color: 'yellow' }, // Back face (continued)
    { vertices: [0, 4, 7], color: 'red' }, // Left face
    { vertices: [0, 7, 3], color: 'blue' }, // Left face (continued)
    { vertices: [1, 5, 6], color: 'orange' }, // Right face
    { vertices: [1, 6, 2], color: 'cyan' }, // Right face (continued)
    { vertices: [0, 1, 5], color: 'purple' }, // Top face
    { vertices: [0, 5, 4], color: 'pink' }, // Top face (continued)
    { vertices: [2, 6, 7], color: 'green' }, // Bottom face
    { vertices: [2, 7, 3], color: 'white' }, // Bottom face (continued)
    { vertices: [0, 1, 2], color: 'gray' }, // Front face
    { vertices: [0, 2, 3], color: 'brown' }, // Front face (continued)
  ],
  new Vector3(0, -100, 100),
  new Vector3(100 / 2, 100 / 2, 100 / 2),
);

function update() {
  const x = parseFloat((document.getElementById('x') as HTMLInputElement).value.toString());
  const y = parseFloat((document.getElementById('y') as HTMLInputElement).value.toString());
  const z = parseFloat((document.getElementById('z') as HTMLInputElement).value.toString());
  //cube.position = new Vector3(x, y, z);

  //console.log(cube, cube2, cube3);

  //render(player, [cube, cube2, cube3], fov);

  [q, w, e] = [q, w + 2, e];

  let test = Model.rotateModel(new Cube(100).model, [toRadians(q), toRadians(w), toRadians(e)]);

  console.log(test);
  render(player, [cubeC], fov);
}

async function init() {
  player = new Player();
  player.bindKeys();
  const gameInterval = setInterval(update, gameTicks);

  // Example usage
  const objData = await parseObjFile('./models/Cube.obj');
  console.log('Vertex count:', objData.vertices);
  console.log('Triangle count:', objData.triangles);
}

init();
