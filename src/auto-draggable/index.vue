<template>
  <div
    ref="autoDraggableRef"
    class="auto-draggable"
    :style="AutoDraggableStyle"
    :class="{ 'select-none': disabledUserSelect }"
  >
    <template v-for="handle in handles" :key="handle">
      <slot :name="handle">
        <div class="handle" :class="'handle-' + handle"></div>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts" name="AutoDraggable">
import { type CSSProperties, computed, ref } from 'vue';
import type { AutoDraggable, HandlesSet } from '../types/index.d';
import { useUtils } from '../hooks/useUtils.hook';
import { useEvent } from '../hooks/useEvent.hook';
interface AutoDraggableProps {
  theme?: string; // 主题色，默认#409EFD
  unitType?: 'px' | '%'; // 单位，默认px
  scale?: number | string; // 缩放比例，默认1
  isKeepDecimals?: boolean; // 是否保留小数，默认false
  decimalPlaces?: number; // 保留几位小数,默认2位
  draggable?: boolean; // 是否可以移动，默认true
  resizeable?: boolean; // 是否可以缩放，默认true
  limitAreaForParent?: boolean; // 限制元素移动区域为父元素内，默认true
  modelValue: AutoDraggable;
  disabledUserSelect?: boolean; // 是否开启选择文本，默认false
  handles?: Array<HandlesSet[number]>; // 控制触点，默认全选
}
const props = withDefaults(defineProps<AutoDraggableProps>(), {
  theme: '#409EFD', // 默认主题颜色
  unitType: 'px',
  scale: 1,
  isKeepDecimals: false,
  decimalPlaces: 2,
  draggable: true,
  resizeable: true,
  limitAreaForParent: true,
  disabledUserSelect: true, // 控制用户是否可以选择文本
  modelValue: () => ({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    z: 1,
  }),
  handles: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: AutoDraggable): void;
}>();

const autoDraggable = computed({
  get() {
    return props.modelValue;
  },
  set(value: AutoDraggable) {
    emit('update:modelValue', value);
  },
});

const autoDraggableRef = ref<HTMLElement>();
const { setValUnit } = useUtils(props);
useEvent(autoDraggableRef, autoDraggable, props);
/**
 * --------------------------computed
 */

// 这里采用top、left 而不采用transform，因为有百分比单位，而transform 百分比基于自身
const AutoDraggableStyle = computed<CSSProperties>(() => {
  return {
    borderColor: props.theme,
    left: setValUnit(autoDraggable.value.left),
    top: setValUnit(autoDraggable.value.top),
    width: setValUnit(autoDraggable.value.width),
    height: setValUnit(autoDraggable.value.height),
    zIndex: autoDraggable.value.z,
  };
});

/**
 * --------------------------methods
 */

// const mousedownHandlerForParent = (event: MouseEvent) => {
//   const { clientX, clientY } = event;
//   let draggable = true;
//   console.log(clientX, clientY);
//   const { left, top } = autoDraggable.value;
//   autoDraggableRef.value?.addEventListener(
//     'mousemove',
//     (e) => draggable && moveHandler(e, left, top, clientX, clientY)
//   );
//   autoDraggableRef.value?.addEventListener('mouseup', (e) => {
//     draggable = false;
//   });
// };
// const moveHandler = (
//   event: MouseEvent,
//   initEleX: number | string,
//   initEleY: number | string,
//   initX: number,
//   initY: number
// ) => {
//   const l = Number(initEleX);
//   const t = Number(initEleY);
//   autoDraggable.value.left = l + figureFinalValue(event.clientX - initX);
//   autoDraggable.value.top = t + figureFinalValue(event.clientY - initY);
//   console.log(l + event.clientX - initX);
// };
</script>

<style scoped lang="scss">
@import url('../styles/auto-draggable.scss');
</style>
