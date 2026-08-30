import type { DragDirection, HandlePosition } from '../types';

interface UseKeyboardOptions {
  enabled: boolean;
  step: number;
  disabled: boolean;
  readOnly: boolean;
  active: boolean;
  dragDirections: DragDirection[];
  resizeDirections: HandlePosition[];
  focusedHandle: HandlePosition | null;
}

const keyMap: Partial<Record<string, DragDirection>> = {
  ArrowUp: 'top',
  ArrowDown: 'bottom',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

const handleAxes: Record<HandlePosition, DragDirection[]> = {
  tl: ['top', 'bottom', 'left', 'right'],
  tm: ['top', 'bottom'],
  tr: ['top', 'bottom', 'left', 'right'],
  ml: ['left', 'right'],
  mr: ['left', 'right'],
  bl: ['top', 'bottom', 'left', 'right'],
  bm: ['top', 'bottom'],
  br: ['top', 'bottom', 'left', 'right']
};

const oppositeDirection: Record<DragDirection, DragDirection> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};

export function useKeyboard(
  getOptions: () => UseKeyboardOptions,
  move: (direction: DragDirection, distance: number) => void,
  resize: (handle: HandlePosition, direction: DragDirection, distance: number) => void,
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

    const direction = keyMap[event.key];
    if (!direction) return;

    const step = Number.isFinite(options.step) && options.step > 0 ? options.step : 1;

    if (options.focusedHandle && options.resizeDirections.includes(options.focusedHandle)) {
      if (!handleAxes[options.focusedHandle].includes(direction)) return;
      event.preventDefault();
      resize(options.focusedHandle, event.shiftKey ? oppositeDirection[direction] : direction, step);
      return;
    }

    if (event.shiftKey) {
      const handle = options.resizeDirections.includes('br')
        ? 'br'
        : options.resizeDirections[0];
      if (!handle) return;
      event.preventDefault();
      resize(handle, direction, step);
      return;
    }

    if (!options.dragDirections.includes(direction)) return;
    event.preventDefault();
    move(direction, step);
  };

  return { handleKeyDown };
}
