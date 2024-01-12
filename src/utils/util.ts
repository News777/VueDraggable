export const valIsNaN = (
  value: number | string | undefined,
  replaceVal: number = 1
): number => {
  return isNaN(Number(value)) ? replaceVal : Number(value);
};

// 计算移动后的数值，通过传入参数 scale（缩放比例）、isKeepDecimals（是否保留小数）进行计算出最后的数值
export const figureFinalValue = (
  value: string | number,
  scale: number | string | undefined,
  isKeepDecimals: boolean = false,
  decimalPlaces: number = 2
): number => {
  const scaleOfNumber = valIsNaN(scale);
  const valueOfNumber = valIsNaN(value);
  return isKeepDecimals
    ? Number((valueOfNumber / scaleOfNumber).toFixed(decimalPlaces))
    : Math.round(valueOfNumber / scaleOfNumber);
};

// 设置数值实际的单位
export const setValUnit = (
  val: string | number,
  unitType: string = 'px'
): string => {
  if (!val) {
    return '0';
  }
  return val + unitType;
};

export const restrictToBounds = (
  value: number,
  min: number,
  max: number,
  limitAreaForParent: boolean = true
) => {
  if (value < min && limitAreaForParent) {
    return min;
  }
  if (value > max && limitAreaForParent) {
    return max;
  }
  return value;
};

export function addEvent<K extends keyof GlobalEventHandlersEventMap>(
  el: HTMLElement,
  event: K,
  handler: (this: HTMLElement, ev: GlobalEventHandlersEventMap[K]) => void
): void {
  if (!el) return;
  el.addEventListener(event, handler as EventListener, false);
}

export function removeEvent<K extends keyof GlobalEventHandlersEventMap>(
  el: HTMLElement,
  event: K,
  handler: (this: HTMLElement, ev: GlobalEventHandlersEventMap[K]) => void
): void {
  if (!el) return;
  el.removeEventListener(event, handler as EventListener, false);
}
