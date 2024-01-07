import type { AutoDraggableProps } from '@/types';

export const valIsNaN = (value: number): number => {
  return isNaN(value) ? 1 : value;
};

export const useUtils = ({
  scale,
  isKeepDecimals,
  decimalPlaces,
  unitType,
}: AutoDraggableProps) => {
  const scaleOfNumber = valIsNaN(Number(scale));

  // 计算移动后的数值，通过传入参数 scale（缩放比例）、isKeepDecimals（是否保留小数）进行计算出最后的数值
  const figureFinalValue = (value: string | number): number => {
    const valueOfNumber = valIsNaN(Number(value));
    return isKeepDecimals
      ? Math.round(valueOfNumber / scaleOfNumber)
      : Number((valueOfNumber / scaleOfNumber).toFixed(decimalPlaces));
  };

  // 设置数值实际的单位
  const setValUnit = (val: string | number): string => {
    return val + unitType!;
  };

  return { figureFinalValue, setValUnit };
};
