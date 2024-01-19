
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

## Props

下面是 AutoDraggable 组件可用的 props:

```javascript
{
  theme: '#409EFD', // 主题色，默认 '#409EFD'
  unitType: 'px', // 单位，默认 'px'
  scale: 1, // 缩放比例，默认 1
  isKeepDecimals: false, // 是否保留小数，默认 false
  decimalPlaces: 2, // 保留几位小数, 默认 2 位
  draggable: true, // 是否可以拖拽，默认 true
  resizable: true, // 是否可缩放，默认 true
  limitAreaForParent: true, // 限制移动区域为父元素内，默认 true
  modelValue: { left: 0, top: 0, width: 0, height: 0, zIndex: 1 }, // 默认模型值
  minWidth: 0, // 最小宽度
  minHeight: 0, // 最小高度
  handles: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'], // 控制触点
  // 其他你可能需要的 props...
}
```

## Events

组件发出的事件：

- `update:modelValue`: 当 `modelValue` 改变时触发
- `drag-start`: 拖动开始时触发
- `drag-stop`: 拖动停止时触发
- `resize-start`: 调整大小开始时触发
- `resize-stop`: 调整大小停止时触发
- `active`: 组件变为活跃状态时触发
- `inactive`: 组件变为非活跃状态时触发

## 安装

```bash
npm install your-autodraggable-package-name
```

## 使用方式

在你的 Vue3 应用中如何使用 VueAutoDraggable 组件：

```vue
<script setup>
import { ref } from 'vue';
import AutoDraggable from 'vue-auto-draggable';

const draggableProps = ref({
  // ...你的 props 定义
});

const handleUpdateModelValue = (newValue) => {
  // ...处理 modelValue 更新的逻辑
};
</script>

<template>
  <AutoDraggable v-model="draggableProps">
    <!-- 你的可拖动内容 -->
  </AutoDraggable>
</template>
```


## 许可协议

VueAutoDraggable 组件遵循 [MIT 许可协议](./LICENSE)。