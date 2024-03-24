import { fov } from '../index.js';
import { Vector2 } from '../types/Vector2.js';
import { Vector3 } from '../types/Vector3.js';
import { toRadians } from './Math.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export const toCanvasCoords = (vector: Vector2) => new Vector2(vector.x + canvas.width / 2, canvas.height / 2 - vector.y);

export function drawVertex(vector: Vector2 = new Vector2(), clr = '#fff'): void {
  ctx.strokeStyle = clr;
  vector = toCanvasCoords(vector);
  ctx.beginPath();
  ctx.arc(vector.x, vector.y, 5, 0, 2 * Math.PI);
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

export function getOnScreen(object: Vector3): Vector2 {
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

  const final = new Vector2(i * 100 * Math.sign(object.z), j * 100 * Math.sign(object.y));
  //console.log(final);

  return final;
}
