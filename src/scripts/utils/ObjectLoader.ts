export interface ObjData {
  vertices: number;
  vertexNormals: number;
  textureCoordinates: number;
  triangles: number;
}

export async function parseObjFile(filePath: string): Promise<ObjData> {
  const objData: ObjData = {
    vertices: 0,
    vertexNormals: 0,
    textureCoordinates: 0,
    triangles: 0,
  };

  const response = await fetch(filePath);
  const data = await response.text();

  //const data = fs.readFileSync(filePath, 'utf-8');

  const lines = data.split('\n');

  for (const line of lines) {
    const tokens = line.trim().split(/\s+/);

    if (tokens[0] === 'v') {
      // Vertex
      objData.vertices++;
    } else if (tokens[0] === 'vn') {
      // Vertex Normal
      objData.vertexNormals++;
    } else if (tokens[0] === 'vt') {
      // Texture Coordinate
      objData.textureCoordinates++;
    } else if (tokens[0] === 'f') {
      // Face (triangle)
      const verticesInFace = tokens.length - 1;
      // Assuming every face is a triangle
      objData.triangles += verticesInFace - 2;
    }
  }

  return objData;
}
