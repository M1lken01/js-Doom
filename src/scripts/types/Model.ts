import { Vector3 } from './Vector3.js';

export class Model {
  vertices: Vector3[];

  constructor(vertices: Vector3[] = [new Vector3()]) {
    this.vertices = vertices;
  }
}
