# 媒体资源文件夹

这个文件夹用于存放文档网站的媒体资源。

## 需要的文件

### icon.svg
项目 Logo，用于封面页和导航栏。

**建议规格：**
- 格式：SVG（矢量图）
- 尺寸：120x120 或以上
- 风格：简洁、现代

**临时方案：**
如果暂时没有 Logo，可以使用 emoji 或文字作为占位符。

例如，创建一个简单的 SVG：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="20" fill="url(#gradient)"/>
  <text x="60" y="75" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">DC</text>
</svg>
```

将上述内容保存为 `icon.svg` 即可。

## 其他可选资源

- **favicon.ico** - 浏览器标签页图标
- **banner.png** - 社交媒体分享图片
- **screenshots/** - 项目截图

