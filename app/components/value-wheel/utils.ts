import type { Arc } from "./types";

/**
 * polarToCartesian
 * @param {*} centerX
 * @param {*} centerY
 * @param {*} radius
 * @param {*} angleInDegrees
 */
export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

/**
 * createArc - create data points for an svg arc
 *
 * https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
 *
 * @param {*} x centerx
 * @param {*} y centery
 * @param {*} radius
 * @param {*} startAngle
 * @param {*} endAngle
 *
 * @returns [startx, starty, rad, rad, x-axis-rotation,
 * large-arc-flag, sweep-flag, endx, endy]
 */

export const createArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): Arc => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  // M : x y
  // A : rx ry x-axis-rotation large-arc-flag sweep-flag x y
  return [start.x, start.y, radius, radius, 0, largeArcFlag, 0, end.x, end.y];
};

export const createAngles = (nslices: number, margin: number) => {
  return (i: number, offset = 0): [number, number] => {
    const incr = 360 / nslices;
    const angle1 = 90 + i * incr;
    const angle2 = angle1 + incr;
    return [angle1 + offset + margin, angle2 + offset - margin];
  };
};

export const getFlags = ({ invert = false }) => {
  if (!invert) {
    return [0, 0, 0];
  }
  return [1, 0, 1];
};
