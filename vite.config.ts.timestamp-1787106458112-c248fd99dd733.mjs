// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "file:///D:/otherApp/VueDraggable/node_modules/.pnpm/vite@5.4.21_@types+node@18.19.130_sass@1.97.3/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/otherApp/VueDraggable/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vi_a036ef0893d493333bbc59bd39580084/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/otherApp/VueDraggable/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1._851dd72fb29c804f08a05e3aea78ebaf/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///D:/otherApp/VueDraggable/node_modules/.pnpm/vite-plugin-vue-setup-exten_7ea3de21b863a0d5043a3e046a5a7339/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import dts from "file:///D:/otherApp/VueDraggable/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_891ec3cbec01897aea3c856af2dc7b10/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/otherApp/VueDraggable/vite.config.ts";
var __dirname = fileURLToPath(new URL("./", __vite_injected_original_import_meta_url));
var resolvePath = (p) => path.resolve(__dirname, p);
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      include: ["src/index.ts", "src/types/"],
      exclude: ["src/**/*.vue"],
      outDir: "lib"
    })
  ],
  resolve: {
    alias: {
      "@": resolvePath("src")
    }
  },
  build: {
    outDir: resolvePath("lib"),
    emptyOutDir: true,
    lib: {
      entry: resolvePath("src/index.ts"),
      name: "VueMovableBox",
      fileName: (format) => `vue-movable-box.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "decimal.js"],
      output: {
        globals: {
          vue: "Vue",
          "decimal.js": "Decimal"
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (/\.(css|less|scss)$/.test(name)) {
            return "css/VueMovableBox.[ext]";
          }
          return "[name].[hash].[ext]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxvdGhlckFwcFxcXFxWdWVEcmFnZ2FibGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG90aGVyQXBwXFxcXFZ1ZURyYWdnYWJsZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovb3RoZXJBcHAvVnVlRHJhZ2dhYmxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgdnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKTtcbmNvbnN0IHJlc29sdmVQYXRoID0gKHA6IHN0cmluZykgPT4gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgcCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICB2dWVTZXR1cEV4dGVuZCgpLFxuICAgIGR0cyh7XG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgY2xlYW5WdWVGaWxlTmFtZTogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjL2luZGV4LnRzJywgJ3NyYy90eXBlcy8nXSxcbiAgICAgIGV4Y2x1ZGU6IFsnc3JjLyoqLyoudnVlJ10sXG4gICAgICBvdXREaXI6ICdsaWInLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZVBhdGgoJ3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiByZXNvbHZlUGF0aCgnbGliJyksXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZVBhdGgoJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ1Z1ZU1vdmFibGVCb3gnLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGB2dWUtbW92YWJsZS1ib3guJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICdkZWNpbWFsLmpzJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgJ2RlY2ltYWwuanMnOiAnRGVjaW1hbCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGFzc2V0SW5mby5uYW1lIHx8ICcnO1xuICAgICAgICAgIGlmICgvXFwuKGNzc3xsZXNzfHNjc3MpJC8udGVzdChuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuICdjc3MvVnVlTW92YWJsZUJveC5bZXh0XSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnW25hbWVdLltoYXNoXS5bZXh0XSc7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1EsU0FBUyxlQUFlLFdBQVc7QUFDblMsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxTQUFTO0FBTjZJLElBQU0sMkNBQTJDO0FBUTlNLElBQU0sWUFBWSxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFDOUQsSUFBTSxjQUFjLENBQUMsTUFBYyxLQUFLLFFBQVEsV0FBVyxDQUFDO0FBRTVELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLGVBQWU7QUFBQSxJQUNmLElBQUk7QUFBQSxNQUNGLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLFNBQVMsQ0FBQyxnQkFBZ0IsWUFBWTtBQUFBLE1BQ3RDLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssWUFBWSxLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRLFlBQVksS0FBSztBQUFBLElBQ3pCLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxNQUNILE9BQU8sWUFBWSxjQUFjO0FBQUEsTUFDakMsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsbUJBQW1CLE1BQU07QUFBQSxJQUNqRDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQzlCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLGNBQWM7QUFBQSxRQUNoQjtBQUFBLFFBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBTSxPQUFPLFVBQVUsUUFBUTtBQUMvQixjQUFJLHFCQUFxQixLQUFLLElBQUksR0FBRztBQUNuQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
