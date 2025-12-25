/**
 * 星露谷物语精灵图动画配置管理模块
 * 统一管理所有精灵图的配置信息
 * 
 * 添加新配置：参考 _media/stardew/ADD_NEW_SPRITE.md
 */

// 精灵图配置库
const StardewSpriteConfigs = {
  // ==================== 已配置的精灵图 ====================
  
  // 棕色小鸡
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
  },
  
  // ==================== 待配置的素材 ====================
  // 以下素材已放置在 _media/stardew/ 目录，等待配置信息：
  // - BabyBlue Chicken..png
  // - BabyBrown Chicken..png
  // - BabyBrown Cow..png
  // - BabyGoat..png
  // - BabyPig..png
  // - BabyRabbit..png
  // - BabySheep..png
  // - BabyVoid Chicken..png
  // - BabyWhite Chicken..png
  // - BabyWhite Cow..png
  // - Blue Chicken..png
  // - Brown Cow..png
  // - cat..png
  // - Dinosaur..png
  // - dog..png
  // - Duck..png
  // - Goat..png
  // - horse..png
  // - Pig..png
  // - Rabbit..png
  // - ShearedSheep..png
  // - Sheep..png
  // - Void Chicken..png
  // - White Chicken..png
  // - White Cow..png
  //
  // 添加新配置时，请提供：
  // 1. 配置名称（kebab-case，如：blue-chicken）
  // 2. 文件路径（如：_media/stardew/Blue Chicken..png）
  // 3. 像素信息（单帧宽度x高度，每行x每列帧数）
};

/**
 * 根据配置名称获取配置
 * @param {string} configName - 配置名称
 * @returns {Object|null} 配置对象，如果不存在返回null
 */
function getSpriteConfig(configName) {
  return StardewSpriteConfigs[configName] || null;
}

/**
 * 获取所有可用的配置名称
 * @returns {string[]} 配置名称数组
 */
function getAllConfigNames() {
  return Object.keys(StardewSpriteConfigs);
}

/**
 * 将配置转换为HTML属性字符串
 * @param {string} configName - 配置名称
 * @returns {string} HTML属性字符串
 */
function configToAttributes(configName) {
  const config = getSpriteConfig(configName);
  if (!config) {
    console.warn(`配置 "${configName}" 不存在`);
    return '';
  }
  
  const attrs = [
    `data-stardew-sprite`,
    `data-sprite-src="${config.imageSrc}"`,
    `data-sprite-width="${config.width}"`,
    `data-sprite-height="${config.height}"`,
    `data-sprite-scale="${config.scale}"`,
    `data-frames-per-row="${config.framesPerRow}"`,
    `data-frames-per-column="${config.framesPerColumn}"`,
    `data-fps="${config.fps}"`,
    `data-speed="${config.speed}"`,
    `data-move-min="${config.moveRange.min}"`,
    `data-move-max="${config.moveRange.max}"`,
    `data-initial-direction="${config.initialDirection}"`,
    `data-pause-on-change="${config.pauseOnChange}"`,
    `data-pause-duration="${config.pauseDuration}"`,
    `data-pause-midway="${config.pauseMidway}"`,
    `data-midway-pause-duration="${config.midwayPauseDuration}"`,
  ];
  
  // 如果有自定义动画序列，添加它们
  if (config.left) {
    attrs.push(`data-animation-sequence-left="${config.left.join(',')}"`);
  }
  if (config.right) {
    attrs.push(`data-animation-sequence-right="${config.right.join(',')}"`);
  }
  
  return attrs.join(' ');
}

/**
 * 创建精灵图容器的HTML
 * @param {string} configName - 配置名称
 * @param {string} containerId - 容器ID（可选）
 * @returns {string} HTML字符串
 */
function createSpriteHTML(configName, containerId) {
  const id = containerId || `sprite-${configName}-${Date.now()}`;
  const attrs = configToAttributes(configName);
  return `<span id="${id}" ${attrs}></span>`;
}

// 导出供全局使用
if (typeof window !== 'undefined') {
  window.StardewSpriteConfigs = StardewSpriteConfigs;
  window.getSpriteConfig = getSpriteConfig;
  window.getAllConfigNames = getAllConfigNames;
  window.configToAttributes = configToAttributes;
  window.createSpriteHTML = createSpriteHTML;
}

