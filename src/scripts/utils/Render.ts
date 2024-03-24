import { Model } from '../types/Model.js';
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

export function drawModel(model: Model): void {
  const onScreenVertices: Vector2[] = [];
  for (let i = 0; i < model.vertices.length; i++) {
    const vertex = getOnScreen(Vector3.subtract(model.position, Vector3.subtract(model.pivot, model.vertices[i])), player.position);
    onScreenVertices.push(vertex);
    drawVertex(vertex);
  }

  for (let i = 0; i < model.polygons.length; i++) {
    drawPolygon(model.polygons[i].map((index) => onScreenVertices[index]) as PolygonVector, getRandomColor());
  }
}

export const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

export function render(p: Player, models: Model[], f: number): void {
  fov = f;
  player = p;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < models.length; i++) {
    drawModel(models[i]);
  }

  drawVertex(new Vector2(), 5, 'lime');
}
