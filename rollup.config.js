import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve'; // 帮助 Rollup 查找外部模块
import commonjs from '@rollup/plugin-commonjs'; // 将 CommonJS 转换成 ES6 module
import typescript from 'rollup-plugin-typescript2'; // 编译 TypeScript
import { terser } from 'rollup-plugin-terser'; // 压缩生成的包

export default {
  input: 'src/index.ts', // 入口文件
  output: {
    format: 'esm', // 模块系统，根据需要选择 'esm', 'cjs', 'umd' 或其他
    file: 'dist/bundle.js', // 输出文件
  },
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: true } },
    }),
    terser(), // 用于生产环境的代码压缩
  ],
  external: ['vue'], // 外部依赖，不会打包进最终文件
};
