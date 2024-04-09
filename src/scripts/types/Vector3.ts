export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Properties
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  get normalized() {
    const mag = this.magnitude;
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }

  get sqrMagnitude() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  get [Symbol.toStringTag]() {
    return 'Vector3';
  }

  // Indexer
  get(index: number): number {
    if (index === 0) return this.x;
    if (index === 1) return this.y;
    if (index === 2) return this.z;
    throw new Error('Invalid index for Vector3');
  }

  set(index: number, value: number): void;
  set(vector: Vector3): void;
  set(arg1: number | Vector3, arg2?: number): void {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      switch (arg1) {
        case 0:
          this.x = arg1;
          break;
        case 1:
          this.y = arg1;
          break;
        case 2:
          this.z = arg1;
          break;
        default:
          throw new Error('Invalid index for Vector3');
      }
    } else if (arg1 instanceof Vector3) {
      this.x = arg1.x;
      this.y = arg1.y;
      this.z = arg1.z;
    } else {
      throw new Error('Invalid arguments for Vector3.set');
    }
  }

  // Public Methods
  equals(other: Vector3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  length(): number {
    return 3;
  }

  // Static Methods
  static angle(from: Vector3, to: Vector3) {
    const cosTheta = Vector3.dot(from.normalized, to.normalized);
    return Math.acos(Math.min(Math.max(cosTheta, -1), 1)) * (180 / Math.PI);
  }

  static cross(lhs: Vector3, rhs: Vector3) {
    return new Vector3(lhs.y * rhs.z - lhs.z * rhs.y, lhs.z * rhs.x - lhs.x * rhs.z, lhs.x * rhs.y - lhs.y * rhs.x);
  }

  static distance(a: Vector3, b: Vector3) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));
  }

  static dot(lhs: Vector3, rhs: Vector3) {
    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
  }

  static max(lhs: Vector3, rhs: Vector3) {
    return new Vector3(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y), Math.max(lhs.z, rhs.z));
  }

  static min(lhs: Vector3, rhs: Vector3) {
    return new Vector3(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y), Math.min(lhs.z, rhs.z));
  }

  static normalize(vector: Vector3) {
    return vector.normalized;
  }

  static scale(a: Vector3, b: Vector3) {
    return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
  }

  static signedAngle(from: Vector3, to: Vector3, axis: Vector3) {
    const unsignedAngle = Vector3.angle(from, to);
    const cross = Vector3.cross(from, to);
    const sign = Vector3.dot(axis, cross) < 0 ? -1 : 1;
    return unsignedAngle * sign;
  }

  // Operators
  static subtract(lhs: Vector3, rhs: Vector3) {
    return new Vector3(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z);
  }

  static multiply(lhs: Vector3, rhs: Vector3) {
    if (typeof rhs === 'number') {
      return new Vector3(lhs.x * rhs, lhs.y * rhs, lhs.z * rhs);
    } else {
      return new Vector3(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z);
    }
  }

  static divide(lhs: Vector3, rhs: Vector3) {
    if (typeof rhs === 'number') {
      return new Vector3(lhs.x / rhs, lhs.y / rhs, lhs.z / rhs);
    } else {
      return new Vector3(lhs.x / rhs.x, lhs.y / rhs.y, lhs.z / rhs.z);
    }
  }

  static add(lhs: Vector3, rhs: Vector3) {
    return new Vector3(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z);
  }

  static equals(lhs: Vector3, rhs: Vector3) {
    return lhs.x === rhs.x && lhs.y === rhs.y && lhs.z === rhs.z;
  }

  static negate(vector: Vector3) {
    return new Vector3(-vector.x, -vector.y, -vector.z);
  }
}
