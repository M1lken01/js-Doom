import { Model } from '../types/Model.js';
import { Vector3 } from '../types/Vector3.js';

export class Cube {
  size: number;
  position: Vector3;
  model: Model;

  constructor(size: number = 100, position: Vector3 = new Vector3()) {
    this.size = size;
    this.position = position;
    this.model = new Model(
      [
        new Vector3(0, 0, 0),
        new Vector3(0, size, 0),
        new Vector3(0, size, size),
        new Vector3(0, 0, size),
        new Vector3(size, 0, 0),
        new Vector3(size, size, 0),
        new Vector3(size, size, size),
        new Vector3(size, 0, size),
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
      position,
      new Vector3(size / 2, size / 2, size / 2),
    );
  }
}
