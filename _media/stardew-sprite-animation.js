/**
 * 星露谷物语精灵图动画系统
 * 支持精灵图（sprite sheet）的帧动画和移动
 */

class StardewSprite {
  constructor(options) {
    // 基本配置
    this.imageSrc = options.imageSrc; // 精灵图路径
    this.container = options.container; // 容器元素或选择器
    this.width = options.width || 32; // 单个精灵的宽度
    this.height = options.height || 32; // 单个精灵的高度
    this.scale = options.scale || 2; // 缩放倍数
    
    // 动画配置
    this.framesPerRow = options.framesPerRow || 4; // 每行的帧数
    this.framesPerColumn = options.framesPerColumn || 4; // 每列的帧数
    this.fps = options.fps || 8; // 帧率
    this.animationSequence = options.animationSequence || null; // 动画序列（帧索引），null表示自动根据方向选择
    this.useAllFrames = options.useAllFrames || false; // 是否使用所有帧
    
    // 移动配置
    this.speed = options.speed || 1; // 移动速度（像素/帧）
    this.moveRange = options.moveRange || { min: 0, max: 400 }; // 移动范围
    this.direction = options.direction || 'left'; // 初始方向: 'left' | 'right'
    this.pauseOnDirectionChange = options.pauseOnDirectionChange !== false; // 方向切换前是否暂停
    this.pauseDuration = options.pauseDuration || 1000; // 暂停时长（毫秒）
    this.pauseMidway = options.pauseMidway !== false; // 是否在中间位置暂停
    this.midwayPauseDuration = options.midwayPauseDuration || 2000; // 中间暂停时长（毫秒）
    
    // 方向动画映射（如果没有指定序列，根据方向自动选择）
    this.directionAnimations = options.directionAnimations || {
      'left': null,  // null表示使用默认计算
      'right': null
    };
    
    // 内部状态
    this.currentFrame = 0;
    this.frameIndex = 0;
    this.position = { x: 0, y: 0 };
    this.animationTimer = null;
    this.image = null;
    this.canvas = null;
    this.ctx = null;
    this.isLoaded = false;
    this.currentAnimationSequence = null; // 当前使用的动画序列
    this.originalAnimationSequence = null; // 保存的原始动画序列（用于暂停后恢复）
    this.isPaused = false; // 是否暂停移动
    this.pauseStartTime = 0; // 暂停开始时间
    this.moveAnimationFrame = null; // 移动动画帧ID
    this.pauseAnimationPlayCount = 0; // 暂停动画播放计数（用于控制循环次数）
    this.hasPausedMidway = false; // 是否已经在中间位置暂停过（用于当前方向）
    this.isMidwayPause = false; // 当前是否是中间暂停
    
    // 初始化
    this.init();
  }
  
  init() {
    // 创建容器
    const container = typeof this.container === 'string' 
      ? document.querySelector(this.container) 
      : this.container;
    
    if (!container) {
      console.error('StardewSprite: 容器元素未找到');
      return;
    }
    
    // 创建 canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    // 像素风格渲染（不同浏览器的兼容写法）
    this.canvas.style.imageRendering = '-moz-crisp-edges'; // Firefox
    this.canvas.style.imageRendering = '-webkit-crisp-edges'; // Safari/Chrome
    this.canvas.style.imageRendering = 'pixelated'; // 标准写法
    this.canvas.style.position = 'relative';
    this.canvas.style.display = 'inline-block';
    this.canvas.style.verticalAlign = 'middle';
    this.canvas.style.marginLeft = '10px';
    this.canvas.style.transition = 'none'; // 不使用 CSS transition，使用 requestAnimationFrame 更流畅
    this.canvas.style.willChange = 'transform'; // 优化性能
    
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false; // 禁用平滑，保持像素风格
    
    // 插入到容器中
    container.appendChild(this.canvas);
    
    // 加载图片
    this.loadImage();
  }
  
  loadImage() {
    this.image = new Image();
    this.image.crossOrigin = 'anonymous'; // 允许跨域（如果需要）
    this.image.onload = () => {
      this.isLoaded = true;
      // 根据初始方向设置初始位置
      // 如果初始方向是 left，从右侧开始（max位置）
      // 如果初始方向是 right，从左侧开始（min位置）
      if (this.direction === 'left') {
        this.position.x = this.moveRange.max;
      } else {
        this.position.x = this.moveRange.min;
      }
      // 验证图片尺寸是否匹配配置
      const expectedWidth = this.framesPerRow * this.width;
      const expectedHeight = this.framesPerColumn * this.height;
      if (this.image.width !== expectedWidth || this.image.height !== expectedHeight) {
        console.warn(`StardewSprite: 图片尺寸不匹配。实际: ${this.image.width}x${this.image.height}, 期望: ${expectedWidth}x${expectedHeight}`);
        console.info(`提示: 如果图片尺寸不同，请调整 data-sprite-width、data-sprite-height、data-frames-per-row 和 data-frames-per-column 参数`);
      } else {
        console.log(`StardewSprite: 图片加载成功 ${this.imageSrc} (${this.image.width}x${this.image.height})`);
      }
      
      // 初始化动画序列
      if (this.animationSequence) {
        this.currentAnimationSequence = this.animationSequence;
      } else {
        this.currentAnimationSequence = this.getAnimationSequenceForDirection(this.direction);
      }
      
      this.startAnimation();
      this.startMovement();
    };
    this.image.onerror = () => {
      console.error('StardewSprite: 图片加载失败', this.imageSrc);
      // 显示错误提示
      if (this.canvas) {
        this.canvas.style.border = '1px dashed #ff0000';
        this.canvas.title = '图片加载失败: ' + this.imageSrc;
      }
    };
    // 处理路径中的空格和特殊字符
    this.image.src = this.imageSrc;
  }
  
  /**
   * 根据方向获取动画序列
   */
  getAnimationSequenceForDirection(direction) {
    // 如果指定了方向动画映射，使用它
    if (this.directionAnimations[direction] !== null && this.directionAnimations[direction] !== undefined) {
      return this.directionAnimations[direction];
    }
    
    // 如果使用所有帧，循环播放所有帧（不管方向）
    if (this.useAllFrames) {
      const totalFrames = this.framesPerRow * this.framesPerColumn;
      return Array.from({ length: totalFrames }, (_, i) => i);
    }
    
    // 根据方向选择对应的行
    // 第一行(0-3)：往左走
    // 第二行(4-7)：往右走
    let startFrame;
    if (direction === 'left') {
      startFrame = 0; // 第1行：往左走
    } else {
      startFrame = this.framesPerRow; // 第2行：往右走（索引从0开始，所以是1）
    }
    
    return Array.from({ length: this.framesPerRow }, (_, i) => startFrame + i);
  }
  
  /**
   * 更新动画序列（当方向改变时调用）
   */
  updateAnimationSequence() {
    const newSequence = this.getAnimationSequenceForDirection(this.direction);
    if (JSON.stringify(newSequence) !== JSON.stringify(this.currentAnimationSequence)) {
      this.currentAnimationSequence = newSequence;
      this.currentFrame = 0; // 重置到第一帧
      this.frameIndex = 0;
    }
  }
  
  /**
   * 获取当前帧在精灵图中的位置
   */
  getFramePosition(frameIndex) {
    const row = Math.floor(frameIndex / this.framesPerRow);
    const col = frameIndex % this.framesPerRow;
    return {
      x: col * this.width,
      y: row * this.height
    };
  }
  
  /**
   * 绘制当前帧
   */
  draw() {
    if (!this.isLoaded) return;
    
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 获取当前帧位置
    if (!this.currentAnimationSequence || this.currentAnimationSequence.length === 0) {
      return;
    }
    const frameIndex = this.currentAnimationSequence[this.currentFrame];
    const framePos = this.getFramePosition(frameIndex);
    
    // 直接绘制，不需要翻转
    // 第一行（0-3）本身就是往左走的动画
    // 第二行（4-7）本身就是往右走的动画
    this.ctx.drawImage(
      this.image,
      framePos.x, framePos.y, this.width, this.height,
      0, 0, this.canvas.width, this.canvas.height
    );
  }
  
  /**
   * 开始动画循环
   */
  startAnimation() {
    const frameInterval = 1000 / this.fps;
    
    this.animationTimer = setInterval(() => {
      if (!this.currentAnimationSequence || this.currentAnimationSequence.length === 0) {
        return;
      }
      this.frameIndex++;
      
      // 如果是暂停动画且需要控制循环次数
      if (this.isPaused && this.pauseAnimationPlayCount >= 0) {
        // 检查是否播放完两次循环
        const singleCycleLength = this.framesPerRow; // 单次循环的长度（4帧）
        const totalCycles = 2; // 需要播放的次数
        const totalFrames = singleCycleLength * totalCycles; // 总帧数（8帧）
        
        if (this.frameIndex >= totalFrames) {
          // 播放完两次循环，停止动画，显示最后一帧
          this.currentFrame = totalFrames - 1;
          if (this.animationTimer) {
            clearInterval(this.animationTimer);
            this.animationTimer = null;
          }
          this.draw();
          return;
        }
        this.currentFrame = this.frameIndex;
      } else {
        // 正常动画，无限循环
        this.currentFrame = this.frameIndex % this.currentAnimationSequence.length;
      }
      
      this.draw();
    }, frameInterval);
    
    // 立即绘制第一帧
    this.draw();
  }
  
  /**
   * 暂停移动
   */
  pauseMovement() {
    this.isPaused = true;
    this.pauseStartTime = performance.now();
    // 暂停时停止移动动画
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    
    // 如果是中间暂停，只显示静态帧（不播放动画）
    if (this.isMidwayPause) {
      // 显示当前动画的第一帧（静态）
      if (this.currentAnimationSequence && this.currentAnimationSequence.length > 0) {
        this.currentFrame = 0;
        this.frameIndex = 0;
        this.draw();
      }
    } else {
      // 边界暂停：切换到暂停动画（第七行）
      // 使用第七行（最后一行）的动画帧作为暂停动画
      // 第七行帧索引：6 * framesPerRow 到 6 * framesPerRow + framesPerRow - 1
      const pauseRowIndex = this.framesPerColumn - 1; // 最后一行（索引从0开始，所以是6）
      const pauseStartFrame = pauseRowIndex * this.framesPerRow;
      // 创建包含两次循环的动画序列
      const pauseRowFrames = Array.from(
        { length: this.framesPerRow }, 
        (_, i) => pauseStartFrame + i
      );
      // 循环两次：[24,25,26,27,24,25,26,27]
      const pauseAnimationSequence = [...pauseRowFrames, ...pauseRowFrames];
      
      // 保存原来的动画序列
      this.originalAnimationSequence = this.currentAnimationSequence;
      // 切换到暂停动画序列
      this.currentAnimationSequence = pauseAnimationSequence;
      this.currentFrame = 0;
      this.frameIndex = 0;
      this.pauseAnimationPlayCount = 0; // 重置播放计数
      
      // 开始播放暂停动画
      this.startAnimation();
    }
  }
  
  /**
   * 恢复移动
   */
  resumeMovement() {
    this.isPaused = false;
    this.pauseStartTime = 0;
    // 停止暂停动画
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    // 恢复原来的动画序列
    if (this.originalAnimationSequence) {
      this.currentAnimationSequence = this.originalAnimationSequence;
      this.originalAnimationSequence = null;
    } else {
      // 如果没有保存的序列，根据当前方向重新计算
      this.currentAnimationSequence = this.getAnimationSequenceForDirection(this.direction);
    }
    this.currentFrame = 0;
    this.frameIndex = 0;
    // 重新开始移动动画
    this.startAnimation();
    // 如果是中间暂停，重置标志
    if (this.isMidwayPause) {
      this.isMidwayPause = false;
    }
  }
  
  /**
   * 开始移动
   */
  startMovement() {
    let lastTime = performance.now();
    
    const move = (currentTime) => {
      if (!this.isLoaded) {
        this.moveAnimationFrame = requestAnimationFrame(move);
        return;
      }
      
      // 如果暂停中，检查是否应该恢复
      if (this.isPaused) {
        const pauseElapsed = currentTime - this.pauseStartTime;
        // 根据暂停类型选择不同的暂停时长
        const currentPauseDuration = this.isMidwayPause ? this.midwayPauseDuration : this.pauseDuration;
        if (pauseElapsed >= currentPauseDuration) {
          this.resumeMovement();
          // 恢复时重置时间，避免deltaTime过大
          lastTime = currentTime;
          this.isMidwayPause = false; // 重置中间暂停标志
        } else {
          this.moveAnimationFrame = requestAnimationFrame(move);
          return;
        }
      }
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // 更新位置（基于时间而非固定帧率，更平滑）
      const moveDistance = (this.speed * deltaTime) / 16.67; // 归一化到60fps
      
      const oldDirection = this.direction;
      let directionChanged = false;
      
      if (this.direction === 'right') {
        this.position.x += moveDistance;
        if (this.position.x >= this.moveRange.max) {
          this.position.x = this.moveRange.max;
          this.direction = 'left';
          directionChanged = true;
        }
      } else {
        this.position.x -= moveDistance;
        if (this.position.x <= this.moveRange.min) {
          this.position.x = this.moveRange.min;
          this.direction = 'right';
          directionChanged = true;
        }
      }
      
      // 检查是否到达中间位置（用于中间停顿）
      if (this.pauseMidway && !this.hasPausedMidway && !this.isPaused) {
        const midPoint = (this.moveRange.min + this.moveRange.max) / 2;
        const distanceToMid = Math.abs(this.position.x - midPoint);
        const threshold = 5; // 允许的误差范围（像素）
        
        if (distanceToMid <= threshold) {
          // 到达中间位置，暂停
          this.hasPausedMidway = true;
          this.isMidwayPause = true;
          this.pauseMovement();
          this.moveAnimationFrame = requestAnimationFrame(move);
          return;
        }
      }
      
      // 如果方向改变了
      if (directionChanged) {
        // 重置中间暂停标志
        this.hasPausedMidway = false;
        
        // 更新动画序列（除非使用所有帧或指定了固定序列）
        if (!this.animationSequence && !this.useAllFrames) {
          this.updateAnimationSequence();
        }
        
        // 如果需要暂停，则暂停移动
        if (this.pauseOnDirectionChange) {
          this.pauseMovement();
        }
      }
      
      // 更新 canvas 位置
      this.canvas.style.transform = `translateX(${this.position.x}px)`;
      
      this.moveAnimationFrame = requestAnimationFrame(move);
    };
    
    this.moveAnimationFrame = requestAnimationFrame(move);
  }
  
  /**
   * 停止动画
   */
  stop() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
    if (this.moveAnimationFrame) {
      cancelAnimationFrame(this.moveAnimationFrame);
      this.moveAnimationFrame = null;
    }
  }
  
  /**
   * 销毁实例
   */
  destroy() {
    this.stop();
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

/**
 * 初始化页面中的精灵动画
 */
function initStardewSprites() {
  // 查找所有带有 data-stardew-sprite 属性的元素
  // 但排除侧边栏中的元素，只在主内容区域（main）中初始化
  const allContainers = document.querySelectorAll('[data-stardew-sprite]');
  const spriteContainers = Array.from(allContainers).filter(container => {
    // 检查容器是否在侧边栏中
    const sidebar = container.closest('.sidebar');
    if (sidebar) {
      return false; // 排除侧边栏中的元素
    }
    // 检查容器是否在主内容区域中
    const main = container.closest('main');
    return main !== null; // 只在主内容区域中初始化
  });
  
  spriteContainers.forEach((container, index) => {
    // 避免重复初始化（如果已经有实例）
    if (container.dataset.spriteInitialized === 'true') {
      return;
    }
    container.dataset.spriteInitialized = 'true';
    
    // 检查是否使用了配置名称（推荐方式）
    const configName = container.getAttribute('data-config');
    let config = {};
    
    if (configName) {
      // 优先使用配置管理器
      if (typeof window.getSpriteConfig === 'function') {
        const presetConfig = window.getSpriteConfig(configName);
        if (presetConfig) {
          config = { ...presetConfig };
          config.container = container;
        } else {
          console.error(`❌ 配置 "${configName}" 不存在！请检查 _media/stardew-sprite-config.js`);
          console.info(`💡 可用配置：`, typeof window.getAllConfigNames === 'function' ? window.getAllConfigNames() : '未知');
          return; // 配置不存在，不初始化
        }
      } else {
        console.error('❌ 配置管理器未加载！请确保 _media/stardew-sprite-config.js 已引入');
        return;
      }
    }
    
    // 如果没有使用配置管理器，则从HTML属性读取（向后兼容，但不推荐）
    if (!configName) {
      const imageSrc = container.getAttribute('data-sprite-src');
      if (!imageSrc) {
        console.error('❌ 未指定配置名称(data-config)且未提供图片路径(data-sprite-src)！');
        console.info('💡 推荐使用配置管理器方式：data-stardew-sprite data-config="配置名称"');
        return;
      }
      config = {
        imageSrc: imageSrc,
        container: container,
        width: parseInt(container.getAttribute('data-sprite-width')) || 32,
        height: parseInt(container.getAttribute('data-sprite-height')) || 32,
        scale: parseFloat(container.getAttribute('data-sprite-scale')) || 2,
        framesPerRow: parseInt(container.getAttribute('data-frames-per-row')) || 4,
        framesPerColumn: parseInt(container.getAttribute('data-frames-per-column')) || 4,
        fps: parseInt(container.getAttribute('data-fps')) || 8,
        speed: parseFloat(container.getAttribute('data-speed')) || 1,
        moveRange: {
          min: parseInt(container.getAttribute('data-move-min')) || 0,
          max: parseInt(container.getAttribute('data-move-max')) || 400
        }
      };
    } else {
      // 如果使用了配置管理器，允许通过HTML属性覆盖特定参数（优先级更高）
      config = {
        ...config,
        imageSrc: container.getAttribute('data-sprite-src') || config.imageSrc,
        container: container,
        width: container.getAttribute('data-sprite-width') ? parseInt(container.getAttribute('data-sprite-width')) : config.width,
        height: container.getAttribute('data-sprite-height') ? parseInt(container.getAttribute('data-sprite-height')) : config.height,
        scale: container.getAttribute('data-sprite-scale') ? parseFloat(container.getAttribute('data-sprite-scale')) : config.scale,
        framesPerRow: container.getAttribute('data-frames-per-row') ? parseInt(container.getAttribute('data-frames-per-row')) : config.framesPerRow,
        framesPerColumn: container.getAttribute('data-frames-per-column') ? parseInt(container.getAttribute('data-frames-per-column')) : config.framesPerColumn,
        fps: container.getAttribute('data-fps') ? parseInt(container.getAttribute('data-fps')) : config.fps,
        speed: container.getAttribute('data-speed') ? parseFloat(container.getAttribute('data-speed')) : config.speed,
        moveRange: {
          min: container.getAttribute('data-move-min') ? parseInt(container.getAttribute('data-move-min')) : config.moveRange.min,
          max: container.getAttribute('data-move-max') ? parseInt(container.getAttribute('data-move-max')) : config.moveRange.max
        }
      };
    }
    
    // 解析动画序列
    const sequenceAttr = container.getAttribute('data-animation-sequence');
    if (sequenceAttr) {
      config.animationSequence = sequenceAttr.split(',').map(n => parseInt(n.trim()));
    } else {
      // 如果没有指定，设置为null，让系统根据方向自动选择
      config.animationSequence = null;
    }
    
    // 是否使用所有帧
    const useAllFramesAttr = container.getAttribute('data-use-all-frames');
    config.useAllFrames = useAllFramesAttr !== null && useAllFramesAttr !== 'false';
    
    // 初始方向
    const directionAttr = container.getAttribute('data-initial-direction');
    config.direction = directionAttr || config.initialDirection || 'left';
    
    // 方向切换前是否暂停
    const pauseOnChangeAttr = container.getAttribute('data-pause-on-change');
    config.pauseOnDirectionChange = pauseOnChangeAttr !== null && pauseOnChangeAttr !== 'false' 
      ? pauseOnChangeAttr !== 'false' 
      : (config.pauseOnChange !== false);
    
    // 暂停时长
    const pauseDurationAttr = container.getAttribute('data-pause-duration');
    config.pauseDuration = pauseDurationAttr ? parseInt(pauseDurationAttr) : (config.pauseDuration || 1000);
    
    // 是否在中间位置暂停
    const pauseMidwayAttr = container.getAttribute('data-pause-midway');
    config.pauseMidway = pauseMidwayAttr !== null && pauseMidwayAttr !== 'false'
      ? pauseMidwayAttr !== 'false'
      : (config.pauseMidway !== false);
    
    // 中间暂停时长
    const midwayPauseDurationAttr = container.getAttribute('data-midway-pause-duration');
    config.midwayPauseDuration = midwayPauseDurationAttr ? parseInt(midwayPauseDurationAttr) : (config.midwayPauseDuration || 2000);
    
    // 处理自定义动画序列（如果配置中有）
    if (config.left || config.right) {
      config.directionAnimations = {
        left: config.left || null,
        right: config.right || null
      };
    }
    
    // 验证配置
    if (!config.imageSrc) {
      console.error('StardewSprite: 缺少图片路径 (data-sprite-src)', container);
      return;
    }
    
    // 创建精灵实例并保存引用
    const sprite = new StardewSprite(config);
    container._stardewSprite = sprite; // 保存引用以便后续操作
  });
}

// 当 DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStardewSprites);
} else {
  initStardewSprites();
}

// 导出供 Docsify 使用
if (typeof window !== 'undefined') {
  window.StardewSprite = StardewSprite;
  window.initStardewSprites = initStardewSprites;
}

