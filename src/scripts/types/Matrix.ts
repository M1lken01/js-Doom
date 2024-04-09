export class Matrix {
  data: number[][];

  constructor(data: number[][]) {
    this.data = data;
  }

  // Addition of two matrices
  add(other: Matrix): Matrix {
    if (this.data.length !== other.data.length || this.data[0].length !== other.data[0].length) {
      throw new Error('Matrices must have the same dimensions for addition');
    }

    const resultData: number[][] = [];
    for (let i = 0; i < this.data.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.data[0].length; j++) {
        row.push(this.data[i][j] + other.data[i][j]);
      }
      resultData.push(row);
    }

    return new Matrix(resultData);
  }

  // Subtraction of two matrices
  subtract(other: Matrix): Matrix {
    if (this.data.length !== other.data.length || this.data[0].length !== other.data[0].length) {
      throw new Error('Matrices must have the same dimensions for subtraction');
    }

    const resultData: number[][] = [];
    for (let i = 0; i < this.data.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.data[0].length; j++) {
        row.push(this.data[i][j] - other.data[i][j]);
      }
      resultData.push(row);
    }

    return new Matrix(resultData);
  }

  // Multiplication of two matrices
  multiply(other: Matrix): Matrix {
    if (this.data[0].length !== other.data.length) {
      throw new Error('Number of columns in first matrix must match number of rows in second matrix for multiplication');
    }

    const resultData: number[][] = [];
    for (let i = 0; i < this.data.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < other.data[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < other.data.length; k++) {
          sum += this.data[i][k] * other.data[k][j];
        }
        row.push(sum);
      }
      resultData.push(row);
    }

    return new Matrix(resultData);
  }

  // Display matrix
  print() {
    for (let i = 0; i < this.data.length; i++) {
      console.log(this.data[i].join('\t'));
    }
  }
}
