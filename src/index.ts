import type { App, Plugin } from 'vue';
import AutoDraggableComponent from './auto-draggable/index.vue';

const AutoDraggable: Plugin = {
  install(app: App) {
    app.component(AutoDraggableComponent.name!, AutoDraggableComponent);
  },
};

export default AutoDraggable;
export { AutoDraggableComponent };
