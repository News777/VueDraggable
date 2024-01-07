<template>
  <div class="container">
    <div style="margin-bottom: 20px">
      <select v-model="radio">
        <option value="1280x800">1280x800</option>
        <option value="1024x600">1024x600</option>
      </select>
    </div>
    <div class="canvas-outsize" :style="outsizeStyle">
      <div class="canvas" :style="style">
        <AutoDraggableComponent v-model="autoDraggable" :scale="scale" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoDraggableComponent from './auto-draggable/index.vue';
import type { AutoDraggable } from './types/index';
import { ref, computed, reactive, watch } from 'vue';

const autoDraggable = ref<AutoDraggable>({
  width: 500,
  height: 400,
  top: 0,
  left: 0,
});

const radio = ref<string>('1280x800');
const context = reactive<{ width: number; height: number }>({
  width: 1280,
  height: 800,
});
watch(
  radio,
  (newVal) => {
    const [width, height] = newVal.split('x').map(Number);
    context.width = width;
    context.height = height;
  },
  {
    immediate: true,
  }
);

const scale = ref<number>(0.5);

const outsizeStyle = computed(() => {
  return {
    width: context.width * scale.value + 'px',
    height: context.height * scale.value + 'px',
  };
});
const style = computed(() => {
  return {
    scale: scale.value,
    width: context.width + 'px',
    height: context.height + 'px',
  };
});
</script>

<style scoped>
.container {
  width: 100vh;
  height: 100vh;
  .canvas-outsize {
    width: 500px;
    height: 500px;
    border: 1px solid red;
    .canvas {
      width: 1000px;
      height: 1000px;
      scale: 0.5;
      transform-origin: 0 0;
    }
  }
}
</style>
