import type { ExtendsAutoDraggable, AutoDraggableProps } from './type';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<AutoDraggableProps>, {
    theme: string;
    unitType: string;
    scale: number;
    isKeepDecimals: boolean;
    decimalPlaces: number;
    draggable: boolean;
    resizeable: boolean;
    limitAreaForParent: boolean;
    disabledUserSelect: boolean;
    ratioLock: boolean;
    modelValue: () => {
        left: number;
        top: number;
        width: number;
        height: number;
        zIndex: number;
    };
    minWidth: number;
    minHeight: number;
    handles: () => string[];
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: ExtendsAutoDraggable) => void;
    "drag-start": (e: MouseEvent, value: ExtendsAutoDraggable) => void;
    "drag-stop": (e: MouseEvent, oldValue: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable) => void;
    "resize-start": (e: MouseEvent, value: ExtendsAutoDraggable) => void;
    "resize-stop": (e: MouseEvent, oldValue: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable) => void;
    active: (value: ExtendsAutoDraggable) => void;
    inactive: (value: ExtendsAutoDraggable) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<AutoDraggableProps>, {
    theme: string;
    unitType: string;
    scale: number;
    isKeepDecimals: boolean;
    decimalPlaces: number;
    draggable: boolean;
    resizeable: boolean;
    limitAreaForParent: boolean;
    disabledUserSelect: boolean;
    ratioLock: boolean;
    modelValue: () => {
        left: number;
        top: number;
        width: number;
        height: number;
        zIndex: number;
    };
    minWidth: number;
    minHeight: number;
    handles: () => string[];
}>>> & {
    onActive?: ((value: ExtendsAutoDraggable) => any) | undefined;
    "onUpdate:modelValue"?: ((value: ExtendsAutoDraggable) => any) | undefined;
    "onDrag-start"?: ((e: MouseEvent, value: ExtendsAutoDraggable) => any) | undefined;
    "onDrag-stop"?: ((e: MouseEvent, oldValue: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable) => any) | undefined;
    "onResize-start"?: ((e: MouseEvent, value: ExtendsAutoDraggable) => any) | undefined;
    "onResize-stop"?: ((e: MouseEvent, oldValue: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable) => any) | undefined;
    onInactive?: ((value: ExtendsAutoDraggable) => any) | undefined;
}, {
    theme: string;
    unitType: "px" | "%";
    scale: string | number;
    isKeepDecimals: boolean;
    decimalPlaces: number;
    draggable: boolean;
    resizeable: boolean;
    limitAreaForParent: boolean;
    modelValue: ExtendsAutoDraggable;
    minWidth: string | number;
    minHeight: string | number;
    ratioLock: boolean;
    disabledUserSelect: boolean;
    handles: ("tl" | "tm" | "tr" | "mr" | "br" | "bm" | "bl" | "ml")[];
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
