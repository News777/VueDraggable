export declare const valIsNaN: (value: number | string | undefined, replaceVal?: number) => number;
export declare const figureFinalValue: (value: string | number, scale: number | string | undefined, isKeepDecimals?: boolean, decimalPlaces?: number) => number;
export declare const setValUnit: (val: string | number, unitType?: string) => string;
export declare const restrictToBounds: (value: number, min: number, max: number, limitAreaForParent?: boolean) => number;
export declare function addEvent<K extends keyof GlobalEventHandlersEventMap>(el: HTMLElement, event: K, handler: (this: HTMLElement, ev: GlobalEventHandlersEventMap[K]) => void): void;
export declare function removeEvent<K extends keyof GlobalEventHandlersEventMap>(el: HTMLElement, event: K, handler: (this: HTMLElement, ev: GlobalEventHandlersEventMap[K]) => void): void;
