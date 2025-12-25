# 添加新精灵图配置指南

## 📋 使用流程

当你提供以下信息后，我会帮你添加配置：

1. **精灵图名称**（用于配置标识，如：`brown-chicken`）
2. **文件路径**（如：`_media/stardew/Brown Chicken..png`）
3. **像素大小**：
   - 单帧宽度（如：`16`）
   - 单帧高度（如：`16`）
   - 每行帧数（如：`4`）
   - 每列帧数（如：`7`）

## 📝 配置模板

在 `_media/stardew-sprite-config.js` 中添加新配置：

```javascript
'配置名称': {
  imageSrc: '_media/stardew/文件名.png',
  width: 16,              // 单帧宽度（你提供）
  height: 16,            // 单帧高度（你提供）
  scale: 3,              // 显示缩放（默认3，可根据需要调整）
  framesPerRow: 4,       // 每行帧数（你提供）
  framesPerColumn: 7,    // 每列帧数（你提供）
  fps: 6,                // 动画帧率（默认6，可根据需要调整）
  speed: 0.8,            // 移动速度（默认0.8，可根据需要调整）
  moveRange: { min: 0, max: 300 },  // 移动范围（默认0-300）
  initialDirection: 'left',         // 初始方向（默认left）
  pauseOnChange: true,              // 边界暂停（默认true）
  pauseDuration: 2500,              // 边界暂停时长（默认2500ms）
  pauseMidway: true,                // 中间暂停（默认true）
  midwayPauseDuration: 2000,        // 中间暂停时长（默认2000ms）
},
```

## 🎯 使用方式

配置添加后，在 Markdown 中使用：

```markdown
## 标题 <span data-stardew-sprite data-config="配置名称"></span>
```

## 📊 示例

假设你提供：
- 名称：`blue-chicken`
- 路径：`_media/stardew/Blue Chicken..png`
- 像素：16x16，4行7列

我会添加配置：

```javascript
'blue-chicken': {
  imageSrc: '_media/stardew/Blue Chicken..png',
  width: 16,
  height: 16,
  scale: 3,
  framesPerRow: 4,
  framesPerColumn: 7,
  fps: 6,
  speed: 0.8,
  moveRange: { min: 0, max: 300 },
  initialDirection: 'left',
  pauseOnChange: true,
  pauseDuration: 2500,
  pauseMidway: true,
  midwayPauseDuration: 2000,
},
```

然后你就可以使用：

```markdown
## 标题 <span data-stardew-sprite data-config="blue-chicken"></span>
```

## ⚙️ 可调整参数说明

如果默认参数不合适，可以调整：

| 参数 | 说明 | 默认值 | 调整建议 |
|------|------|--------|----------|
| `scale` | 显示大小 | `3` | 小角色用3-4，大角色用2-3 |
| `fps` | 动画速度 | `6` | 慢：4-6，快：8-10 |
| `speed` | 移动速度 | `0.8` | 慢：0.5-0.8，快：1-1.5 |
| `moveRange.max` | 移动范围 | `300` | 根据页面宽度调整 |

## 🔍 已放置的素材列表

当前 `_media/stardew/` 目录中的素材：

- BabyBlue Chicken..png
- BabyBrown Chicken..png
- BabyBrown Cow..png
- BabyGoat..png
- BabyPig..png
- BabyRabbit..png
- BabySheep..png
- BabyVoid Chicken..png
- BabyWhite Chicken..png
- BabyWhite Cow..png
- Blue Chicken..png
- Brown Chicken..png ✅ (已配置)
- Brown Cow..png
- cat..png
- Dinosaur..png
- dog..png
- Duck..png
- Goat..png
- horse..png
- Pig..png
- Rabbit..png
- ShearedSheep..png
- Sheep..png
- Void Chicken..png
- White Chicken..png
- White Cow..png

## 💡 提示

1. **提供信息格式**：
   ```
   名称：xxx
   路径：_media/stardew/xxx.png
   像素：宽度x高度，每行x每列
   ```

2. **如果需要特殊参数**，请一并说明，我会在配置中调整

3. **配置添加后**，我会更新此文档，标记已配置的素材

