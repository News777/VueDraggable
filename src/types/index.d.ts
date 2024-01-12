export interface AutoDraggable {
  left: number | string;
  top: number | string;
  width: number | string;
  height: number | string;
  zIndex?: number;
}

export interface AutoDraggableProps {
  theme?: string; // 主题色，默认#409EFD
  unitType?: 'px' | '%'; // 单位，默认px
  scale?: number | string; // 缩放比例，默认1
  isKeepDecimals?: boolean; // 是否保留小数，默认false
  decimalPlaces?: number; // 保留几位小数,默认2位
  draggable?: boolean;
  resizeable?: boolean;
  limitAreaForParent?: boolean;
  areaWidth?: number | string; // 父区域width 默认获取父元素width
  areaHeight?: number | string; // 父区域height 默认获取父元素height
  modelValue: AutoDraggable;
  active: boolean; // 该组件是否活跃
  disabledUserSelect?: boolean; // 是否开启选择文本，默认false
  handles?: Array<HandlesSet[number]>; // 控制触点，默认全选
}

export type HandlesSet = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
