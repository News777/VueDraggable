import { describe, expect, it } from 'vitest';
import { snapToElements, snapToGrid } from './snap';

describe('snap utilities', () => {
  it('snaps to the nearest candidate independently on both axes', () => {
    const result = snapToElements(
      { left: 8, top: 11, width: 20, height: 20 },
      [
        { id: 'far', left: 5, top: 8, width: 20, height: 20 },
        { id: 'near', left: 10, top: 12, width: 20, height: 20 }
      ],
      5
    );
    expect(result).toMatchObject({ left: 10, top: 12, snapped: true, targetId: 'near' });
    expect(result.points).toEqual(['left', 'top']);
    expect(result.guides).toEqual({ vertical: [10], horizontal: [12] });
  });

  it('uses target order as the stable tie breaker and includes the threshold boundary', () => {
    const result = snapToElements(
      { left: 10, top: 100, width: 20, height: 20 },
      [
        { id: 'first', left: 5, top: 200, width: 20, height: 20 },
        { id: 'second', left: 15, top: 300, width: 20, height: 20 }
      ],
      5
    );
    expect(result.left).toBe(5);
    expect(result.targetId).toBe('first');
  });

  it('ignores invalid targets and falls back for invalid grid sizes', () => {
    const result = snapToElements(
      { left: 1, top: 2, width: 3, height: 4 },
      [
        { left: 'bad', top: 0, width: 10, height: 10 },
        { left: ' ', top: 0, width: 10, height: 10 },
        { left: 0, top: 0, width: -10, height: 10 }
      ],
      10
    );
    expect(result.snapped).toBe(false);
    expect(snapToGrid(31, 0)).toBe(40);
  });
});
