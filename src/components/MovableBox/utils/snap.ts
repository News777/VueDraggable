import type {
  GuidesEventPayload,
  MovableBoxRect,
  SnapPoint,
  SnapTarget
} from '../types';

export interface SnapResult {
  left: number;
  top: number;
  snapped: boolean;
  snapPoint?: SnapPoint;
  points: SnapPoint[];
  targetId?: string;
  targetIds: { horizontal?: string; vertical?: string };
  guides: GuidesEventPayload;
}

export interface SnapAxes {
  horizontal: boolean;
  vertical: boolean;
}

interface Candidate {
  distance: number;
  guide: number;
  point: SnapPoint;
  targetId?: string;
  value: number;
}

const toFiniteNumber = (value: number | string): number | null => {
  if (typeof value === 'string' && value.trim() === '') return null;
  const converted = Number(value);
  return Number.isFinite(converted) ? converted : null;
};

const toFiniteRect = (rect: MovableBoxRect) => {
  const left = toFiniteNumber(rect.left);
  const top = toFiniteNumber(rect.top);
  const width = toFiniteNumber(rect.width);
  const height = toFiniteNumber(rect.height);
  if (left === null || top === null || width === null || height === null) return null;
  if (width < 0 || height < 0) return null;
  return { left, top, width, height };
};

export function snapToGrid(value: number, gridSize: number): number {
  const size = Number.isFinite(gridSize) && gridSize > 0 ? gridSize : 20;
  return Math.round(value / size) * size;
}

const chooseNearest = (current: Candidate | null, candidate: Candidate, threshold: number) => {
  if (candidate.distance > threshold) return current;
  if (!current || candidate.distance < current.distance) return candidate;
  return current;
};

export function snapToElements(
  current: { left: number; top: number; width: number; height: number },
  targets: SnapTarget[],
  threshold = 10,
  axes: SnapAxes = { horizontal: true, vertical: true }
): SnapResult {
  const limit = Math.max(0, Number.isFinite(threshold) ? threshold : 10);
  const right = current.left + current.width;
  const bottom = current.top + current.height;
  const centerX = current.left + current.width / 2;
  const centerY = current.top + current.height / 2;
  let nearestX: Candidate | null = null;
  let nearestY: Candidate | null = null;

  for (const target of targets) {
    const rect = toFiniteRect(target);
    if (!rect) continue;

    const targetRight = rect.left + rect.width;
    const targetBottom = rect.top + rect.height;
    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    const targetId = target.id;

    const xCandidates: Candidate[] = [
      {
        distance: Math.abs(current.left - rect.left),
        value: rect.left,
        guide: rect.left,
        point: 'left',
        targetId
      },
      {
        distance: Math.abs(right - targetRight),
        value: targetRight - current.width,
        guide: targetRight,
        point: 'right',
        targetId
      },
      {
        distance: Math.abs(current.left - targetRight),
        value: targetRight,
        guide: targetRight,
        point: 'left',
        targetId
      },
      {
        distance: Math.abs(right - rect.left),
        value: rect.left - current.width,
        guide: rect.left,
        point: 'right',
        targetId
      },
      {
        distance: Math.abs(centerX - targetCenterX),
        value: targetCenterX - current.width / 2,
        guide: targetCenterX,
        point: 'center-x',
        targetId
      }
    ];

    const yCandidates: Candidate[] = [
      {
        distance: Math.abs(current.top - rect.top),
        value: rect.top,
        guide: rect.top,
        point: 'top',
        targetId
      },
      {
        distance: Math.abs(bottom - targetBottom),
        value: targetBottom - current.height,
        guide: targetBottom,
        point: 'bottom',
        targetId
      },
      {
        distance: Math.abs(current.top - targetBottom),
        value: targetBottom,
        guide: targetBottom,
        point: 'top',
        targetId
      },
      {
        distance: Math.abs(bottom - rect.top),
        value: rect.top - current.height,
        guide: rect.top,
        point: 'bottom',
        targetId
      },
      {
        distance: Math.abs(centerY - targetCenterY),
        value: targetCenterY - current.height / 2,
        guide: targetCenterY,
        point: 'center-y',
        targetId
      }
    ];

    if (axes.horizontal) {
      for (const candidate of xCandidates) nearestX = chooseNearest(nearestX, candidate, limit);
    }
    if (axes.vertical) {
      for (const candidate of yCandidates) nearestY = chooseNearest(nearestY, candidate, limit);
    }
  }

  const points = [nearestX?.point, nearestY?.point].filter(
    (point): point is SnapPoint => Boolean(point)
  );
  return {
    left: nearestX?.value ?? current.left,
    top: nearestY?.value ?? current.top,
    snapped: points.length > 0,
    snapPoint: points[0],
    points,
    targetId: nearestX?.targetId ?? nearestY?.targetId,
    targetIds: { horizontal: nearestX?.targetId, vertical: nearestY?.targetId },
    guides: {
      vertical: nearestX ? [nearestX.guide] : [],
      horizontal: nearestY ? [nearestY.guide] : []
    }
  };
}

export function getSnapGuides(
  current: { left: number; top: number; width: number; height: number },
  targets: SnapTarget[],
  threshold = 10,
  axes?: SnapAxes
): GuidesEventPayload {
  return snapToElements(current, targets, threshold, axes).guides;
}
