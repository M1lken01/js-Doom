import { Vector3 } from './Vector3.js';

export class Model {
  position: Vector3;
  facing: Vector3;
  health: number;

  constructor(position: Vector3 = new Vector3(), facing: Vector3 = new Vector3(1), health: number = 100) {
    this.position = position;
    this.facing = facing;
    this.health = health;
  }
}
