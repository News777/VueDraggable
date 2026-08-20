import { computed } from 'vue';
import { snapToGrid } from '../utils/snap';

interface UseGridOptions {
  snapToGrid: boolean;
  gridSize: number;
}

export function useGrid(getOptions: () => UseGridOptions) {
  const snapValue = (value: number): number => {
    const options = getOptions();
    return options.snapToGrid ? snapToGrid(value, options.gridSize) : value;
  };

  const snapPosition = (left: number, top: number) => ({
    left: snapValue(left),
    top: snapValue(top)
  });

  const gridInfo = computed(() => {
    const options = getOptions();
    if (!options.snapToGrid) return null;
    return {
      size: Number.isFinite(options.gridSize) && options.gridSize > 0 ? options.gridSize : 20,
      color: 'rgba(64, 158, 255, 0.3)'
    };
  });

  return { snapValue, snapPosition, gridInfo };
}
