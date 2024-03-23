export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // Properties
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get normalized(): Vector2 {
    const mag = this.magnitude;
    return new Vector2(this.x / mag, this.y / mag);
  }

  get sqrMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }

  get [Symbol.toStringTag](): string {
    return 'Vector2';
  }

  // Indexer
  get(index: number): number {
    if (index === 0) return this.x;
    if (index === 1) return this.y;
    throw new Error('Invalid index for Vector2');
  }

  set(index: number, value: number): void;
  set(vector: Vector2): void;
  set(arg1: number | Vector2, arg2?: number): void {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.x = arg1;
      this.y = arg2;
    } else if (arg1 instanceof Vector2) {
      this.x = arg1.x;
      this.y = arg1.y;
    } else {
      throw new Error('Invalid arguments for Vector2.set');
    }
  }

  // Public Methods
  equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  // Static Methods
  static angle(from: Vector2, to: Vector2) {
    const cosTheta = Vector2.dot(from.normalized, to.normalized);
    return Math.acos(Math.min(Math.max(cosTheta, -1), 1)) * (180 / Math.PI);
  }

  static clampMagnitude(vector: Vector2, maxLength: number) {
    const mag = vector.magnitude;
    if (mag > maxLength) {
      return Vector2.multiply(vector.normalized, maxLength);
    }
    return vector;
  }

  static distance(a: Vector2, b: Vector2) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  static dot(lhs: Vector2, rhs: Vector2) {
    return lhs.x * rhs.x + lhs.y * rhs.y;
  }

  static max(lhs: Vector2, rhs: Vector2) {
    return new Vector2(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
  }

  static min(lhs: Vector2, rhs: Vector2) {
    return new Vector2(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
  }

  static normalize(vector: Vector2) {
    return vector.normalized;
  }

  static scale(a: Vector2, b: Vector2) {
    return new Vector2(a.x * b.x, a.y * b.y);
  }

  // Operators
  static subtract(lhs: Vector2, rhs: Vector2) {
    return new Vector2(lhs.x - rhs.x, lhs.y - rhs.y);
  }

  static multiply(lhs: Vector2, rhs: Vector2 | number) {
    if (typeof rhs === 'number') {
      return new Vector2(lhs.x * rhs, lhs.y * rhs);
    } else {
      return new Vector2(lhs.x * rhs.x, lhs.y * rhs.y);
    }
  }

  static divide(lhs: Vector2, rhs: Vector2) {
    if (typeof rhs === 'number') {
      return new Vector2(lhs.x / rhs, lhs.y / rhs);
    } else {
      return new Vector2(lhs.x / rhs.x, lhs.y / rhs.y);
    }
  }

  static add(lhs: Vector2, rhs: Vector2) {
    return new Vector2(lhs.x + rhs.x, lhs.y + rhs.y);
  }

  static equals(lhs: Vector2, rhs: Vector2) {
    return lhs.x === rhs.x && lhs.y === rhs.y;
  }

  static negate(vector: Vector2) {
    return new Vector2(-vector.x, -vector.y);
  }
}
