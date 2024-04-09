import { Vector3 } from './Vector3.js';
import { Matrix } from './Matrix.js';

export type Polygon = { vertices: [number, number, number]; color: string };
type Angles = [number, number, number];

export class Model {
  polygons: Polygon[];
  position: Vector3;
  pivot: Vector3;

  vertices: Vector3[];
  triangles: Polygon[];

  scale: Vector3;
  rotation: Vector3;
  translate: Vector3;

  constructor(
    vertices: Vector3[] = [],
    polygons: Polygon[] = [],
    position: Vector3 = new Vector3(),
    pivot: Vector3 = new Vector3(),
    scale: Vector3 = new Vector3(1, 1, 1),
    rotation: Vector3 = new Vector3(),
    translate: Vector3 = new Vector3(),
    triangles: Polygon[] = [],
  ) {
    this.vertices = vertices;
    this.polygons = polygons;
    this.position = position;
    this.pivot = pivot;
    this.triangles = triangles;
    this.scale = scale;
    this.rotation = rotation;
    this.translate = translate;
  }

  static rotateModel(model: Model, angles: Angles): Model {
    function translationMatrix(tx: number, ty: number, tz: number): number[][] {
      return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1],
      ];
    }

    function inverseTranslationMatrix(tx: number, ty: number, tz: number): number[][] {
      return [
        [1, 0, 0, -tx],
        [0, 1, 0, -ty],
        [0, 0, 1, -tz],
        [0, 0, 0, 1],
      ];
    }

    const translateToOrigin = translationMatrix(model.pivot.x, model.pivot.y, model.pivot.z);
    const translateBack = inverseTranslationMatrix(model.pivot.x, model.pivot.y, model.pivot.z);

    function rotationMatrixX(theta: number): number[][] {
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      return [
        [1, 0, 0],
        [0, cosTheta, -sinTheta],
        [0, sinTheta, cosTheta],
      ];
    }

    function rotationMatrixY(theta: number): number[][] {
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      return [
        [cosTheta, 0, sinTheta],
        [0, 1, 0],
        [-sinTheta, 0, cosTheta],
      ];
    }

    function rotationMatrixZ(theta: number): number[][] {
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      return [
        [cosTheta, -sinTheta, 0],
        [sinTheta, cosTheta, 0],
        [0, 0, 1],
      ];
    }

    // Rotate each vector
    const rotatedVertices: Vector3[] = [];
    const rotationX = rotationMatrixX(angles[0]);
    const rotationY = rotationMatrixY(angles[1]);
    const rotationZ = rotationMatrixZ(angles[2]);
    for (const point of model.vertices) {
      let { x, y, z } = point;

      console.log([x, y, z] + ' 0');
      // Translate to origin
      [x, y, z] = multiplyMatrixVector(translateToOrigin, new Vector3(x, y, z));

      console.log([x, y, z] + ' 1');
      // Apply rotations
      [x, y, z] = multiplyMatrixVector(rotationX, new Vector3(x, y, z));
      [x, y, z] = multiplyMatrixVector(rotationY, new Vector3(x, y, z));
      [x, y, z] = multiplyMatrixVector(rotationZ, new Vector3(x, y, z));

      // Translate back

      console.log([x, y, z] + ' 2');
      //[x, y, z] = multiplyMatrixVector(translateBack, new Vector3(x, y, z));

      rotatedVertices.push(new Vector3(x, y, z));
    }

    function multiplyMatrixVector(matrix: number[][], vector: Vector3): number[] {
      const result: number[] = [];
      for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length(); j++) {
          sum += matrix[i][j] * vector.get(j);
        }
        result.push(sum);
      }
      return result;
    }

    model.vertices = rotatedVertices;

    return model;
  }
}
