# VueMovableBox 更新日志

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.7] - 2026-08-20

### Changed
- 更新发布版本为 `1.1.7`
- 将主组件样式改为原生 CSS，避免发布构建依赖 Sass 编译

### Fixed
- 将网格、键盘、元素吸附和碰撞能力接入统一交互流程，修复此前仅声明参数但未生效的问题
- 修复直接修改 `modelValue`、方向限制仅对键盘生效、边界间距计算不一致和触摸最后一帧丢失问题
- 修复碰撞阻止整帧回退导致组件在目标边缘前残留 1–2px 间隙的问题
- 修复元素贴合后因指针轻微斜向抖动而难以沿碰撞边缘滑动的问题
- 修复快速拖拽或大步长键盘移动可穿过碰撞目标的问题
- 修复斜向快速拖拽穿透目标及扫掠碰撞方向错误的问题
- 修复吸附坐标变化漏发事件及单轴碰撞错误清空另一轴辅助线的问题
- 修复交互过程中切换禁用/只读状态后仍继续移动，以及零高度比例锁定产生非有限尺寸的问题
- 修复发布包缺少 Vue 组件声明文件的问题

### Added
- 增加元素对齐辅助线、状态化吸附事件、拖拽/缩放碰撞阻止以及初始重叠逃逸行为
- 扩充到 58 项组件、工具和公共类型测试，覆盖触摸、键盘、百分比单位、边界、吸附、碰撞、公开方法和兼容别名
- 新增项目路线图，明确 `1.2.0` 至 `2.0.0` 的演进方向和验收原则

---

## [1.1.6] - 2026-08-19

### Changed
- 调整发布版本为 `1.1.6`
- 统一版本声明与包信息，确保发布内容与源码一致

### Fixed
- 统一了公开 API：`resizable` 为首选名称，`resizeable` 仍保留兼容别名
- 修正类型和示例代码中的数值计算问题，避免字符串/数字混用导致的 TS 报错
- 清理了 sass 相关 warning，并移除无用的 Sass 依赖
- 调整了构建输出和文档状态，保证发布包与源码一致

### Added
- 加入 Vitest + Vue Test Utils 的真实交互测试，覆盖拖拽与缩放基础行为
- 增加基础发布前校验脚本，确保 `test` + `build` 运行顺序清晰

---

## [1.1.5-beta.3] - 2026-03-10

### Added
- **代码重构**: 模块化拆分，更好的可维护性
  - `utils/snap.ts` - 对齐吸附逻辑
  - `utils/collision.ts` - 碰撞检测逻辑
  - `composables/useKeyboard.ts` - 键盘控制
  - `composables/useGrid.ts` - 网格吸附
  - `composables/useSnap.ts` - 对齐吸附 composable
  - `composables/useCollision.ts` - 碰撞检测 composable
  - `types.ts` - 类型定义独立文件

### New Features
- **对齐吸附**: 拖拽时自动对齐到其他元素边缘
  - `snapToElements` - 启用对齐
  - `snapThreshold` - 吸附阈值
  - `snapTargets` - 对齐目标元素
  - `@snap` 事件 - 吸附时触发
  - `@guides` 事件 - 辅助线数据

- **碰撞检测**: 防止元素重叠
  - `collisionEnabled` - 启用碰撞检测
  - `allowOverlap` - 允许重叠
  - `@collision` 事件 - 碰撞时触发

---

## [1.1.5-beta.2] - 2026-03-10

### Added
- **网格吸附**: 新增 `snapToGrid` 和 `gridSize` 属性，支持拖拽时自动吸附到网格
- **方向控制**: 新增 `dragDirections` 和 `resizeDirections` 属性，可限制拖拽/调整方向
- **边界边距**: 新增 `edgeDistance` 和 `boundsMargin` 属性，更灵活控制边界
- **键盘支持**: 新增 `keyboardEnabled` 和 `keyboardStep` 属性，支持键盘方向键移动
- **过渡动画**: 新增 `enableTransition` 属性，支持平滑过渡动画
- **GitHub Actions CI**: 自动构建和发布工作流
- **CSS 变量**: 支持通过 CSS 变量自定义主题

### Improved
- **性能优化**: 使用 requestAnimationFrame 批量处理更新，硬件加速
- **代码结构**: 规范化项目目录结构
- **文档完善**: 完整的 API 文档和使用示例

### Fixed
- **Activation Bug**: 修复点击无法激活的问题
- **Ratio Lock**: 修复锁定宽高比无效的问题
- **TypeScript**: 完善的类型定义支持

---

## [1.1.5-beta.1] - 2026-03-10
