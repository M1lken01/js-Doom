import { Vector3 } from './Vector3.js';

type Polygon = [number, number, number];

export class Model {
  vertices: Vector3[];
  polygons: Polygon[];
  position: Vector3;
  pivot: Vector3;

  constructor(vertices: Vector3[] = [new Vector3()], polygons: Polygon[], position: Vector3 = new Vector3(), pivot: Vector3 = new Vector3()) {
    this.vertices = vertices;
    this.polygons = polygons;
    this.position = position;
    this.pivot = pivot;
  }
}
