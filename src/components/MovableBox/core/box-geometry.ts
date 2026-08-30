import type { ExtendsMovableBox } from '../../../types/MovableBox';

export interface BoxGeometryInput {
  left?: number | string;
  top?: number | string;
  width?: number | string;
  height?: number | string;
  zIndex?: number | string;
}

export const asNumber = (
  value: number | string | undefined | null,
  fallback = 0
): number => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  const num = typeof value === 'string' ? Number(value) : value;
  return Number.isFinite(num) ? num : fallback;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const sameRect = (a: ExtendsMovableBox, b: ExtendsMovableBox): boolean => {
  return (
    asNumber(a.left) === asNumber(b.left) &&
    asNumber(a.top) === asNumber(b.top) &&
    asNumber(a.width) === asNumber(b.width) &&
    asNumber(a.height) === asNumber(b.height)
  );
};

export const createDefaultBox = () => ({
  left: 0,
  top: 0,
  width: 200,
  height: 100,
  zIndex: 1
});

export const createMovePayload = (rect: BoxGeometryInput) => ({
  left: asNumber(rect.left, 0),
  top: asNumber(rect.top, 0),
  width: asNumber(rect.width, 0),
  height: asNumber(rect.height, 0),
  zIndex: asNumber(rect.zIndex, 1)
});
