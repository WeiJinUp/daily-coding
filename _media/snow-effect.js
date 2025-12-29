/**
 * Let it Snow - 雪花效果
 * 1:1 复刻 Google AI Studio 雪花效果
 */

(function() {
  'use strict';
  
  // 配置项
  const CONFIG = {
    maxFlakes: 50,              // 最大雪花数量
    spawnInterval: 200,         // 雪花生成间隔（毫秒）
    minDuration: 8,             // 最小下落时间（秒）
    maxDuration: 15,            // 最大下落时间（秒）
    minSize: 0.8,               // 最小尺寸
    maxSize: 1.2,               // 最大尺寸
    snowflakeChar: '❄',         // 雪花字符
    enableAnimation: true       // 启用旋转/摆动动画
  };
  
  // 状态管理
  let isSnowing = false;
  let snowContainer = null;
  let spawnTimer = null;
  let activeFlakes = [];
  
  /**
   * 初始化雪花效果
   */
  function init() {
    // 创建切换按钮
    createToggleButton();
    
    // 创建雪花容器
    createSnowContainer();
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  
  /**
   * 创建切换按钮
   */
  function createToggleButton() {
    const button = document.createElement('button');
    button.className = 'snow-toggle-btn';
    button.innerHTML = '<span class="snow-icon">❄️</span><span>Let it snow</span>';
    button.setAttribute('aria-label', 'Toggle snow effect');
    button.setAttribute('title', 'Let it snow');
    
    button.addEventListener('click', toggleSnow);
    
    document.body.appendChild(button);
  }
  
  /**
   * 创建雪花容器
   */
  function createSnowContainer() {
    snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(snowContainer);
  }
  
  /**
   * 切换雪花效果
   */
  function toggleSnow() {
    const button = document.querySelector('.snow-toggle-btn');
    
    if (isSnowing) {
      stopSnow();
      button.classList.remove('active');
      button.innerHTML = '<span class="snow-icon">❄️</span><span>Let it snow</span>';
      button.setAttribute('title', 'Let it snow');
    } else {
      startSnow();
      button.classList.add('active');
      button.innerHTML = '<span class="snow-icon">❄️</span><span>Stop snowing</span>';
      button.setAttribute('title', 'Stop snowing');
    }
  }
  
  /**
   * 开始下雪
   */
  function startSnow() {
    if (isSnowing) return;
    
    isSnowing = true;
    spawnSnowflakes();
  }
  
  /**
   * 停止下雪
   */
  function stopSnow() {
    if (!isSnowing) return;
    
    isSnowing = false;
    
    // 清除生成定时器
    if (spawnTimer) {
      clearTimeout(spawnTimer);
      spawnTimer = null;
    }
    
    // 移除所有雪花
    removeAllFlakes();
  }
  
  /**
   * 生成雪花
   */
  function spawnSnowflakes() {
    if (!isSnowing) return;
    
    // 如果雪花数量未达到最大值，创建新雪花
    if (activeFlakes.length < CONFIG.maxFlakes) {
      createSnowflake();
    }
    
    // 继续生成
    spawnTimer = setTimeout(spawnSnowflakes, CONFIG.spawnInterval);
  }
  
  /**
   * 创建单个雪花
   */
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // 使用统一的雪花字符
    snowflake.textContent = CONFIG.snowflakeChar;
    
    // 随机位置（横向）
    const left = Math.random() * 100;
    snowflake.style.left = left + '%';
    
    // 随机大小
    const size = randomRange(CONFIG.minSize, CONFIG.maxSize);
    snowflake.style.fontSize = size + 'em';
    
    // 随机下落时间
    const duration = randomRange(CONFIG.minDuration, CONFIG.maxDuration);
    snowflake.style.animationDuration = duration + 's';
    
    // 随机添加旋转或摆动动画
    if (CONFIG.enableAnimation) {
      const animations = ['', 'spin', 'swing'];
      const animation = animations[Math.floor(Math.random() * animations.length)];
      if (animation) {
        snowflake.classList.add(animation);
        
        // 如果有额外动画，设置其持续时间
        const animDuration = randomRange(3, 6);
        snowflake.style.animationDuration = duration + 's, ' + animDuration + 's';
      }
    }
    
    // 添加到容器
    snowContainer.appendChild(snowflake);
    activeFlakes.push(snowflake);
    
    // 动画结束后移除
    snowflake.addEventListener('animationend', function(e) {
      // 只在主动画（snowfall）结束时移除
      if (e.animationName === 'snowfall') {
        removeSnowflake(snowflake);
      }
    });
  }
  
  /**
   * 移除单个雪花
   */
  function removeSnowflake(snowflake) {
    if (!snowflake || !snowflake.parentNode) return;
    
    snowflake.parentNode.removeChild(snowflake);
    
    const index = activeFlakes.indexOf(snowflake);
    if (index > -1) {
      activeFlakes.splice(index, 1);
    }
  }
  
  /**
   * 移除所有雪花
   */
  function removeAllFlakes() {
    activeFlakes.forEach(function(flake) {
      if (flake && flake.parentNode) {
        flake.parentNode.removeChild(flake);
      }
    });
    activeFlakes = [];
  }
  
  /**
   * 生成随机数
   */
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * 处理页面可见性变化
   */
  function handleVisibilityChange() {
    if (document.hidden && isSnowing) {
      // 页面隐藏时暂停
      if (spawnTimer) {
        clearTimeout(spawnTimer);
        spawnTimer = null;
      }
    } else if (!document.hidden && isSnowing) {
      // 页面显示时恢复
      spawnSnowflakes();
    }
  }
  
  /**
   * 清理资源
   */
  function cleanup() {
    stopSnow();
    
    // 移除按钮
    const button = document.querySelector('.snow-toggle-btn');
    if (button && button.parentNode) {
      button.parentNode.removeChild(button);
    }
    
    // 移除容器
    if (snowContainer && snowContainer.parentNode) {
      snowContainer.parentNode.removeChild(snowContainer);
    }
    
    // 移除事件监听
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 导出到全局（用于调试或手动控制）
  window.LetItSnow = {
    start: startSnow,
    stop: stopSnow,
    toggle: toggleSnow,
    cleanup: cleanup,
    config: CONFIG
  };
})();

