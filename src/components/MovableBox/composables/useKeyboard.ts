import type { DragDirection } from '../types';

interface UseKeyboardOptions {
  enabled: boolean;
  step: number;
  disabled: boolean;
  readOnly: boolean;
  active: boolean;
  dragDirections: DragDirection[];
}

export function useKeyboard(
  getOptions: () => UseKeyboardOptions,
  move: (direction: DragDirection, distance: number) => void,
  deactivate: () => void
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const options = getOptions();
    if (!options.enabled || options.disabled || !options.active) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      deactivate();
      return;
    }
    if (options.readOnly) return;

    const keyMap: Partial<Record<string, DragDirection>> = {
      ArrowUp: 'top',
      ArrowDown: 'bottom',
      ArrowLeft: 'left',
      ArrowRight: 'right'
    };
    const direction = keyMap[event.key];
    if (!direction || !options.dragDirections.includes(direction)) return;

    event.preventDefault();
    move(direction, Number.isFinite(options.step) && options.step > 0 ? options.step : 1);
  };

  return { handleKeyDown };
}
