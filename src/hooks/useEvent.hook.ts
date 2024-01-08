// import { onMounted, onUnmounted, type Ref, isRef } from 'vue';

import type { AutoDraggable, AutoDraggableProps } from '@/types';
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  type Ref,
  type WritableComputedRef,
} from 'vue';
import { useUtils } from './useUtils.hook';

// interface UseEventOptions {
//   keyboard?: KeyboardEvent;
//   mouse?: MouseEvent;
//   copy?: CopyEventOptions;
// }

// // 创建通用事件监听 Hook
// export function useEvent(
//   targetElements: Ref<HTMLElement | undefined>[] | HTMLElement[],
//   options: UseEventOptions
// ) {
//   // ...

//   // 确定是使用touch事件还是鼠标事件
//   const isTouchDevice =
//     'ontouchstart' in window || navigator.maxTouchPoints > 0;

//   const eventTypeStart = isTouchDevice ? 'touchstart' : 'mousedown';
//   const eventTypeMove = isTouchDevice ? 'touchmove' : 'mousemove';

//   // ...其余代码

//   onMounted(() => {
//     // 注册事件监听器
//     const addEventListeners = (element: HTMLElement) => {
//       if (keyboard) {
//         element.addEventListener('keydown', handleKeyboardEvent);
//       }

//       if (mouse) {
//         element.addEventListener(eventTypeStart, handleMouseEvent);
//         element.addEventListener(eventTypeMove, handleMouseEvent);
//         // 需要添加其他鼠标相关的事件监听可以在这里继续添加
//       }

//       if (copy) {
//         element.addEventListener('copy', handleCopyEvent);
//       }
//     };

//     targetElements.forEach((element) => {
//       if (isRef(element)) {
//         addEventListeners(element.value as HTMLElement);
//       } else {
//         addEventListeners(element);
//       }
//     });
//   });

//   onUnmounted(() => {
//     // 移除事件监听器
//     const removeEventListeners = (element: HTMLElement) => {
//       if (keyboard) {
//         element.removeEventListener('keydown', handleKeyboardEvent);
//       }

//       if (mouse) {
//         element.removeEventListener(eventTypeStart, handleMouseEvent);
//         element.removeEventListener(eventTypeMove, handleMouseEvent);
//         // 移除时确保移除了之前添加的所有鼠标相关的事件监听
//       }

//       if (copy) {
//         element.removeEventListener('copy', handleCopyEvent);
//       }
//     };

//     targetElements.forEach((element) => {
//       if (isRef(element)) {
//         removeEventListeners(element.value as HTMLElement);
//       } else {
//         removeEventListeners(element);
//       }
//     });
//   });
// }
// 添加事件的兼容性函数，使用了TypeScript类型
export function addEvent(
  el: HTMLElement,
  event: keyof GlobalEventHandlersEventMap,
  handler: (event: Event) => void
): void {
  if (!el) return;
  if ((el as any).attachEvent) {
    // 使用类型断言绕过类型检查
    (el as any).attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, false);
  } else {
    (el as any)['on' + event] = handler;
  }
}

// 移除事件的兼容性函数，使用了TypeScript类型
export function removeEvent(
  el: HTMLElement,
  event: keyof GlobalEventHandlersEventMap,
  handler: (event: Event) => void
): void {
  if (!el) return;
  if ((el as any).detachEvent) {
    // 使用类型断言绕过类型检查
    (el as any).detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, false);
  } else {
    (el as any)['on' + event] = null;
  }
}
export const useEvent = (
  autoDraggableRef: Ref<HTMLElement | undefined>,
  autoDraggable: WritableComputedRef<AutoDraggable>,
  props: AutoDraggableProps
) => {
  const { figureFinalValue } = useUtils(props);

  const parentInfo = reactive<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const mousedownHandler = (e: Event) => {
    const event = e as MouseEvent;
    const { clientX, clientY } = event;
    const { clientWidth, clientHeight } =
      autoDraggableRef.value!.parentElement!;
    if (parentInfo.height !== clientHeight) {
      parentInfo.height = clientHeight;
    }
    if (parentInfo.width !== clientWidth) {
      parentInfo.width = clientWidth;
    }
    console.log(parentInfo);
  };

  onMounted(() => {
    addEvent(autoDraggableRef.value!, 'mousedown', mousedownHandler);
  });
};
