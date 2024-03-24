import { Vector3 } from './Vector3.js';

export class Model {
  vertices: Vector3[];
  position: Vector3;
  pivot: Vector3;

  constructor(vertices: Vector3[] = [new Vector3()], position: Vector3 = new Vector3(), pivot: Vector3 = new Vector3()) {
    this.vertices = vertices;
    this.position = position;
    this.pivot = pivot;
  }
}
