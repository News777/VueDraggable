import type { App, Plugin } from 'vue';
import VueAutoDraggable from '@/index.vue';

const AutoDraggablePlugin: Plugin = {
  install(app: App) {
    app.component('VueAutoDraggable', VueAutoDraggable);
  },
};

export default AutoDraggablePlugin;
export { VueAutoDraggable };
export * from '@/type';
