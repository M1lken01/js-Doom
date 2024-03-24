import { Vector3 } from './Vector3.js';

export class Player {
  position: Vector3;
  facing: Vector3;
  health: number;
  speed: number;

  constructor(position: Vector3 = new Vector3(), facing: Vector3 = new Vector3(1), health: number = 100, speed: number = 50) {
    this.position = position;
    this.facing = facing;
    this.health = health;
    this.speed = speed;
  }

  bindKeys() {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'w':
          this.moveForward();
          break;
        case 'a':
          this.moveLeft();
          break;
        case 's':
          this.moveBackward();
          break;
        case 'd':
          this.moveRight();
          break;
      }
    });
  }

  private moveForward() {
    this.position.x += this.speed;
  }

  private moveBackward() {
    this.position.x -= this.speed;
  }

  private moveLeft() {
    this.position.z -= this.speed;
  }

  private moveRight() {
    this.position.z += this.speed;
  }
}
