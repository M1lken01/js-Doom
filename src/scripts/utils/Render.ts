import { Model, Polygon } from '../types/Model.js';
import { Player } from '../types/Player.js';
import { Vector2 } from '../types/Vector2.js';
import { Vector3 } from '../types/Vector3.js';
import { toRadians } from './Math.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let fov = 90;
let player: Player;

type PolygonVector = [Vector2, Vector2, Vector2];

export const toCanvasCoords = (vector: Vector2) => new Vector2(vector.x + canvas.width / 2, canvas.height / 2 - vector.y);

export function drawVertex(vector: Vector2 = new Vector2(), r = 5, clr = '#fff'): void {
  ctx.strokeStyle = clr;
  vector = toCanvasCoords(vector);
  ctx.beginPath();
  ctx.arc(vector.x, vector.y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

export function drawVector(vector: Vector2 = new Vector2(), trail = new Vector2(), isGlobal = true, clr = '#fff'): void {
  ctx.strokeStyle = clr;
  let trailCanvas = toCanvasCoords(trail);
  vector = toCanvasCoords(vector);
  ctx.beginPath();
  ctx.moveTo(trailCanvas.x, trailCanvas.y);
  let finalVector = isGlobal ? vector : new Vector2(trail.x + vector.x, -trail.y + vector.y);
  ctx.lineTo(finalVector.x, finalVector.y);
  ctx.stroke();
}

export function drawPolygon(polygon: PolygonVector, clr = '#fff'): void {
  ctx.strokeStyle = clr;
  ctx.fillStyle = clr;
  for (let i = 0; i < polygon.length; i++) {
    polygon[i] = toCanvasCoords(polygon[i]);
  }
  ctx.beginPath();
  ctx.moveTo(polygon[0].x, polygon[0].y);
  ctx.lineTo(polygon[1].x, polygon[1].y);
  ctx.lineTo(polygon[2].x, polygon[2].y);
  ctx.closePath();
  ctx.fill();
}

export function getOnScreenSrc(object: Vector3, observer: Vector3): Vector2 {
  object = Vector3.subtract(object, observer);
  const modifier = 100;
  const w = canvas.width;
  const h = canvas.height;
  const alpha1 = fov / 2;
  const alpha2 = alpha1 * (h / w);
  const e = w / 2 / Math.sin(toRadians(alpha1));
  const f = h / 2 / Math.sin(toRadians(alpha2));
  const d = Math.sqrt(e ** 2 - (w / 2) ** 2);
  const q = Math.sqrt(object.y ** 2 + object.z ** 2);

  const m1 = Math.sqrt(q ** 2 + (d + object.x) ** 2);
  const beta1 = Math.asin(q / m1);
  const l1 = d / Math.cos(toRadians(beta1));

  const m2 = Math.sqrt(object.z ** 2 + (d + object.x) ** 2);
  const beta2 = Math.asin(object.z / m2);
  const l2 = d / Math.cos(toRadians(beta2));
  const i = Math.sqrt(l2 ** 2 - d ** 2);
  const j = Math.sqrt(l1 ** 2 - l2 ** 2);

  return new Vector2(i * modifier * Math.sign(object.z), j * modifier * Math.sign(object.y));
}

export function getOnScreen(object: Vector3, observer: Vector3): Vector2 {
  object = Vector3.subtract(object, observer);
  const modifier = 100;
  const w = canvas.width;
  const e = w / 2 / Math.sin(toRadians(fov / 2));
  const d = Math.sqrt(e ** 2 - (w / 2) ** 2);
  const q = Math.sqrt(object.y ** 2 + object.z ** 2);
  const l = d / Math.cos(toRadians(Math.asin(object.z / Math.sqrt(object.z ** 2 + (d + object.x) ** 2))));
  const i = Math.sqrt(l ** 2 - d ** 2);
  const j = Math.sqrt((d / Math.cos(toRadians(Math.asin(q / Math.sqrt(q ** 2 + (d + object.x) ** 2))))) ** 2 - l ** 2);
  return new Vector2(i * modifier * Math.sign(object.z), j * modifier * Math.sign(object.y));
}

export function drawModel2(model: Model): void {
  const onScreenVertices: Vector2[] = [];
  // todo order vertices based on distance (high to low)
  for (let i = 0; i < model.vertices.length; i++) {
    const vertex = getOnScreen(Vector3.subtract(model.position, Vector3.subtract(model.pivot, model.vertices[i])), player.position);
    onScreenVertices.push(vertex);
    drawVertex(vertex);
  }

  /*for (let i = 0; i < model.polygons.length; i++) {
    drawPolygon(model.polygons[i].vertices.map((index) => onScreenVertices[index]) as PolygonVector, model.polygons[i].color);
  }*/

  const distances: { polygons: Polygon; distance: number; center: Vector3 }[] = [];

  function getCenterOfFace(points: Vector3[]): Vector3 {
    let center = new Vector3();

    for (const point of points) {
      center.x += point.x;
      center.y += point.x;
      center.z += point.x;
    }

    center.x = center.x / points.length;
    center.y = center.y / points.length;
    center.z = center.z / points.length;
    return center;
  }

  function mapVertexIndicesToPoints(vertices: Vector3[], vertexIndices: [number, number, number]): Vector3[] {
    return vertexIndices.map((index) => vertices[index]);
  }

  for (const polygons of model.polygons) {
    /*let polygonVertexDistances: number[] = [];
    for (let i = 0; i < polygons.vertices.length; i++) {
      polygonVertexDistances.push(Vector3.distance(player.position, model.vertices[polygons.vertices[i]]));
    }*/
    const center = getCenterOfFace(mapVertexIndicesToPoints(model.vertices, polygons.vertices));
    distances.push({ polygons, center, distance: Vector3.distance(player.position, center) });
  }

  distances.sort((a, b) => b.distance - a.distance);

  /*for (const { polygons } of distances) {
    console.log(polygons.color);
    drawPolygon(polygons.vertices.map((index) => onScreenVertices[index]) as PolygonVector, polygons.color);
  }*/

  for (let i = 0; i < distances.length; i++) {
    console.log(distances[i].polygons.color, i, distances[i].distance);
    drawPolygon(distances[i].polygons.vertices.map((index) => onScreenVertices[index]) as PolygonVector, distances[i].polygons.color);

    drawVertex(getOnScreen(distances[i].center, player.position));
  }
  console.log('divider');
}

export function drawModel(model: Model): void {
  const onScreenVertices: Vector2[] = [];
  for (let i = 0; i < model.vertices.length; i++) {
    const vertex = getOnScreen(Vector3.subtract(model.position, Vector3.subtract(model.pivot, model.vertices[i])), player.position);
    onScreenVertices.push(vertex);
    drawVertex(vertex);
  }

  for (let i = 0; i < model.polygons.length; i++) {
    drawPolygon(model.polygons[i].vertices.map((index) => onScreenVertices[index]) as PolygonVector, getRandomColor());
  }
}

export const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

function drawCrosshair(clr: string = 'lime', gap: number = 6, len: number = 12) {
  drawVector(new Vector2(0, gap), new Vector2(0, gap + len), true, clr);
  drawVector(new Vector2(0, -gap), new Vector2(0, -(gap + len)), true, clr);
  drawVector(new Vector2(gap, 0), new Vector2(gap + len, 0), true, clr);
  drawVector(new Vector2(-gap, 0), new Vector2(-(gap + len), 0), true, clr);
}

export function render(p: Player, models: Model[], f: number): void {
  fov = f;
  player = p;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const distances: { model: Model; distance: number }[] = [];
  for (const model of models) {
    distances.push({ model, distance: Vector3.distance(player.position, model.position) });
  }

  distances.sort((a, b) => b.distance - a.distance);

  for (const { model } of distances) {
    drawModel(model);
  }

  drawCrosshair();
}
