
# AutoDraggable Vue Component

VueAutoDraggable 是一个 Vue 3 组件，提供拖拽和缩放功能，可以自定义多种属性以适应不同需求。此组件使用 TypeScript 并结合 Vite 5 进行构建。

## 特性

- 可选主题色，默认 `#409EFD`
- 支持 `px` 和 `%` 两种单位，默认 `px`
- 自定义缩放比例，默认为 `1`
- 可以选择是否保留小数，默认不保留
- 可设置保留小数位数，默认保留两位
- 可开启或关闭拖拽功能，默认开启
- 可开启或关闭缩放功能，默认开启
- 可限制元素移动区域为父元素内，默认开启
- 可设置活跃状态，默认不活跃
- 可禁用文本选择，默认不禁用
- 可自定义控制触点，默认为全套


## **Props:**

| Prop                 | Type                                          | Default   | Description                                                    |
| -------------------- | --------------------------------------------- | --------- | -------------------------------------------------------------- |
| `theme`              | `string`                                      | `#409EFD` | 主题色                                                         |
| `inActiveColor`      | `string`                                      |           | 失活颜色                                                       |
| `unitType`           | `'px' \| '%'`                                 | `'px'`    | 单位                                                           |
| `scale`              | `number` \| `string`                          | `1`       | 缩放比例                                                       |
| `isKeepDecimals`     | `boolean`                                     | `false`   | 是否保留小数                                                   |
| `decimalPlaces`      | `number`                                      | `2`       | 保留几位小数                                                   |
| `draggable`          | `boolean`                                     | `true`    | 是否可以移动                                                   |
| `resizeable`         | `boolean`                                     | `true`    | 是否可以缩放                                                   |
| `limitAreaForParent` | `boolean`                                     | `true`    | 限制元素移动区域为父元素内                                     |
| `limitAreaClass`     | `string`                                      |           |                                                                |
| `modelValue`         | `Required<Omit<AutoDraggable, 'zIndex'>> & T` |           | 必填，使用 `AutoDraggable` 像型但省略 `zIndex`，再加上类型 `T` |
| `maxWidth`           | `number` \| `string`                          |           | 最大宽度                                                       |
| `maxHeight`          | `number` \| `string`                          |           | 最大高度                                                       |
| `minWidth`           | `number` \| `string`                          |           | 最小宽度                                                       |
| `minHeight`          | `number` \| `string`                          |           | 最小高度                                                       |
| `ratioLock`          | `boolean`                                     |           | 比例锁定                                                       |
| `active`             | `boolean`                                     |           | 该组件是否活跃                                                 |
| `disabledUserSelect` | `boolean`                                     | `false`   | 是否开启选择文本                                               |
| `handles`            | `Array<HandlesSet[number]>`                   |           | 控制触点，默认全选                                             |


## **Emits:**

| Event               | Payload                                                                         | Description              |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------ |
| `update:modelValue` | `value: ExtendsAutoDraggable`                                                   | 用于更新 `modelValue`    |
| `drag-start`        | `e: MouseEvent, value: ExtendsAutoDraggable`                                    | 开始拖动时触发           |
| `drag-stop`         | `e: MouseEvent, oldValue: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable` | 停止拖动时触发           |
| `resize-start`      | `e: MouseEvent, value: ExtendsAutoDraggable`                                    | 开始调整大小时触发       |
| `resize-stop`       | `e: MouseEvent, oldValu: ExtendsAutoDraggable, newValue: ExtendsAutoDraggable`  | 调整大小结束时触发       |
| `active`            | `value: ExtendsAutoDraggable`                                                   | 组件变为活跃状态时触发   |
| `inactive`          | `value: ExtendsAutoDraggable`                                                   | 组件变为非活跃状态时触发 |

## 安装

```bash
pnpm install vue-auto-draggable
```

## 使用方式

在你的 Vue3 应用中如何使用 VueAutoDraggable 组件：

```vue
<script setup>
import { ref } from 'vue';
import { VueAutoDraggable } from 'vue-auto-draggable';
import 'vue-auto-draggable/css'

const draggableProps = ref({
  top: 0,
  left: 0,
  width: 200,
  height: 100
});

</script>

<template>
  <VueAutoDraggable v-model="draggableProps">
    <!-- 你的可拖动内容 -->
  </VueAutoDraggable>
</template>
```


## 许可协议

VueAutoDraggable 组件遵循 [MIT 许可协议](./LICENSE)。