# 星露谷物语精灵图动画使用指南

## 📁 素材存放位置

将所有精灵图 PNG 文件放到以下目录：

```
_media/stardew/
```

例如：
- `_media/stardew/Brown Chicken..png`
- `_media/stardew/cow.png`
- `_media/stardew/pig.png`
- `_media/stardew/chicken.png`

## 🎨 精灵图格式要求

### 基本要求
- **格式**：PNG 图片
- **布局**：精灵图应该是网格布局，包含多个动画帧
- **命名**：建议使用描述性名称，如 `Brown Chicken..png`

### 常见布局示例

#### 示例 1：4列 x 7行（28帧）
```
[帧0] [帧1] [帧2] [帧3]
[帧4] [帧5] [帧6] [帧7]
[帧8] [帧9] [帧10][帧11]
[帧12][帧13][帧14][帧15]
[帧16][帧17][帧18][帧19]
[帧20][帧21][帧22][帧23]
[帧24][帧25][帧26][帧27]
```
- 每帧：16x16 像素
- 总尺寸：64x112 像素

#### 示例 2：4列 x 4行（16帧）
```
[帧0] [帧1] [帧2] [帧3]
[帧4] [帧5] [帧6] [帧7]
[帧8] [帧9] [帧10][帧11]
[帧12][帧13][帧14][帧15]
```
- 每帧：32x32 像素
- 总尺寸：128x128 像素

## 📝 如何添加新的精灵图

### 步骤 1：准备素材
1. 将 PNG 文件放到 `_media/stardew/` 目录
2. 确认图片的像素尺寸和布局

### 步骤 2：测量图片尺寸
使用图片查看工具或代码检查图片尺寸：

```bash
# macOS
sips -g pixelWidth -g pixelHeight "_media/stardew/your-sprite.png"

# 或使用 ImageMagick
identify "_media/stardew/your-sprite.png"
```

### 步骤 3：计算帧数
根据图片尺寸和每帧大小计算：
- **每行的帧数** = 图片宽度 ÷ 单帧宽度
- **每列的帧数** = 图片高度 ÷ 单帧高度

例如：
- 图片：64x112 像素
- 单帧：16x16 像素
- 每行帧数：64 ÷ 16 = 4
- 每列帧数：112 ÷ 16 = 7

### 步骤 4：在配置文件中添加配置

编辑 `_media/stardew-sprite-config.js`，添加新配置：

```javascript
const StardewSpriteConfigs = {
  // ... 现有配置 ...
  
  // 新精灵图配置
  'your-sprite-name': {
    imageSrc: '_media/stardew/your-sprite.png',  // 图片路径
    width: 16,              // 单个精灵帧的宽度（像素）
    height: 16,             // 单个精灵帧的高度（像素）
    scale: 3,               // 显示缩放倍数（调整显示大小）
    framesPerRow: 4,        // 每行的帧数
    framesPerColumn: 7,      // 每列的帧数
    fps: 6,                 // 动画帧率（数值越小越慢）
    speed: 0.8,             // 移动速度（数值越小越慢）
    moveRange: { min: 0, max: 300 },  // 移动范围（像素）
    initialDirection: 'left',          // 初始方向：'left' 或 'right'
    pauseOnChange: true,              // 方向切换前是否暂停
    pauseDuration: 2500,              // 边界暂停时长（毫秒）
    pauseMidway: true,                // 是否在中间位置暂停
    midwayPauseDuration: 2000,         // 中间暂停时长（毫秒）
  },
};
```

### 步骤 5：在 Markdown 中使用

#### ⭐ 使用配置管理器方式（推荐）

**优点**：配置集中管理，易于维护，代码简洁

```markdown
## 标题 <span data-stardew-sprite data-config="your-sprite-name"></span>
```

**添加新配置**：参考 `ADD_NEW_SPRITE.md` 了解如何添加新精灵图配置

## ⚙️ 配置参数说明

| 参数 | 说明 | 示例值 | 如何确定 |
|------|------|--------|----------|
| `width` | 单帧宽度（像素） | `16` | 测量图片中单个角色的宽度 |
| `height` | 单帧高度（像素） | `16` | 测量图片中单个角色的高度 |
| `scale` | 显示缩放倍数 | `3` | 调整显示大小，数值越大显示越大 |
| `framesPerRow` | 每行的帧数 | `4` | 图片宽度 ÷ 单帧宽度 |
| `framesPerColumn` | 每列的帧数 | `7` | 图片高度 ÷ 单帧高度 |
| `fps` | 动画帧率 | `6` | 控制动画速度，数值越小越慢 |
| `speed` | 移动速度 | `0.8` | 控制移动速度，数值越小越慢 |
| `moveRange` | 移动范围 | `{min: 0, max: 300}` | 设置移动的像素范围 |
| `initialDirection` | 初始方向 | `'left'` | `'left'` 或 `'right'` |
| `pauseDuration` | 边界暂停时长 | `2500` | 毫秒，边界处暂停时间 |
| `midwayPauseDuration` | 中间暂停时长 | `2000` | 毫秒，中间位置暂停时间 |

## 🎯 常见精灵图尺寸参考

| 角色类型 | 常见单帧尺寸 | 常见布局 | 总尺寸示例 |
|---------|------------|---------|-----------|
| 小鸡 | 16x16 | 4x7 | 64x112 |
| 牛 | 32x32 | 4x4 | 128x128 |
| 猪 | 32x32 | 4x4 | 128x128 |
| 马 | 32x32 | 4x4 | 128x128 |
| NPC角色 | 16x32 | 4x4 | 64x128 |

## 🔧 快速配置工具

### 使用配置管理器（推荐）

1. 在 `_media/stardew-sprite-config.js` 中添加配置
2. 在 Markdown 中使用：

```markdown
## 标题 <span data-stardew-sprite data-config="your-sprite-name"></span>
```

3. 确保在 `index.html` 中引入了配置脚本：

```html
<script src="_media/stardew-sprite-config.js"></script>
<script src="_media/stardew-sprite-animation.js"></script>
```

### 配置加载逻辑

在 `stardew-sprite-animation.js` 的 `initStardewSprites()` 函数中，会自动检测 `data-config` 属性并加载对应配置。

## 📋 配置示例

### 示例 1：小鸡（16x16，4x7布局）

```javascript
'brown-chicken': {
  imageSrc: '_media/stardew/Brown Chicken..png',
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
}
```

### 示例 2：牛（32x32，4x4布局）

```javascript
'cow': {
  imageSrc: '_media/stardew/cow.png',
  width: 32,
  height: 32,
  scale: 2,
  framesPerRow: 4,
  framesPerColumn: 4,
  fps: 8,
  speed: 1,
  moveRange: { min: 0, max: 400 },
  initialDirection: 'left',
  pauseOnChange: true,
  pauseDuration: 2000,
  pauseMidway: true,
  midwayPauseDuration: 1500,
}
```

## 🐛 常见问题

### Q: 如何确定单帧的宽高？
A: 
1. 打开图片查看工具
2. 查看图片中单个角色的尺寸
3. 或者用总尺寸除以行列数

### Q: 动画太快或太慢？
A: 调整 `fps` 参数：
- 数值越大，动画越快
- 数值越小，动画越慢
- 建议范围：4-12

### Q: 移动太快或太慢？
A: 调整 `speed` 参数：
- 数值越大，移动越快
- 数值越小，移动越慢
- 建议范围：0.5-2.0

### Q: 显示太大或太小？
A: 调整 `scale` 参数：
- 数值越大，显示越大
- 数值越小，显示越小
- 建议范围：1-5

### Q: 如何让精灵图不移动，只播放动画？
A: 设置 `moveRange: { min: 0, max: 0 }` 或 `speed: 0`

### Q: 如何让精灵图只移动不播放动画？
A: 这个功能暂不支持，动画会一直播放

## 📚 相关文件

- `_media/stardew-sprite-animation.js` - 动画核心逻辑
- `_media/stardew-sprite-config.js` - 配置管理模块
- `_media/stardew/` - 素材存放目录
- `docs/README.md` - 使用示例

## 💡 提示

1. **先测试再使用**：添加新配置后，先在测试页面验证效果
2. **保持命名一致**：配置名称建议使用 kebab-case（如 `brown-chicken`）
3. **合理设置范围**：移动范围不要太大，避免超出页面可视区域
4. **性能考虑**：如果页面有多个动画，适当降低 fps 和 speed

