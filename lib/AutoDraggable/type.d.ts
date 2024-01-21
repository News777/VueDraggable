export interface AutoDraggable {
    left: number | string;
    top: number | string;
    width: number | string;
    height: number | string;
    zIndex?: number;
}
export type ExtendsAutoDraggable = AutoDraggable & {
    [key: string]: any;
};
export interface AutoDraggableProps {
    theme?: string;
    unitType?: 'px' | '%';
    scale?: number | string;
    isKeepDecimals?: boolean;
    decimalPlaces?: number;
    draggable?: boolean;
    resizeable?: boolean;
    limitAreaForParent?: boolean;
    limitAreaClass?: string;
    modelValue: ExtendsAutoDraggable;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    ratioLock?: boolean;
    active: boolean;
    disabledUserSelect?: boolean;
    handles?: Array<HandlesSet[number]>;
}
export type HandlesSet = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
