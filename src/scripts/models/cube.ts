import { Model } from '../types/Model.js';
import { Vector3 } from '../types/Vector3.js';

export class Cube {
  size: number;
  position: Vector3;
  model: Model;

  constructor(size: number = 100, position: Vector3 = new Vector3(), color: string = '#fff') {
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
        { vertices: [4, 5, 6], color }, // Back face
        { vertices: [4, 6, 7], color }, // Back face (continued)
        { vertices: [0, 4, 7], color }, // Left face
        { vertices: [0, 7, 3], color }, // Left face (continued)
        { vertices: [1, 5, 6], color }, // Right face
        { vertices: [1, 6, 2], color }, // Right face (continued)
        { vertices: [0, 1, 5], color }, // Top face
        { vertices: [0, 5, 4], color }, // Top face (continued)
        { vertices: [2, 6, 7], color }, // Bottom face
        { vertices: [2, 7, 3], color }, // Bottom face (continued)
        { vertices: [0, 1, 2], color }, // Front face
        { vertices: [0, 2, 3], color }, // Front face (continued)
      ],
      position,
      new Vector3(size / 2, size / 2, size / 2),
    );
  }
}
