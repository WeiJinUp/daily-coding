<div align="center">

# 🚀 Daily Coding Practice

*A comprehensive collection of algorithms, design patterns, and modern Java features*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.6+-blue.svg)](https://maven.apache.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[📚 在线文档](https://yourusername.github.io/daily-coding/) | [🐛 报告问题](https://github.com/yourusername/daily-coding/issues) | [💡 功能建议](https://github.com/yourusername/daily-coding/issues/new?template=feature_request.md)

</div>

---

## 📖 关于本项目

这是一个精心整理的 **Java 学习与实践仓库**，涵盖算法、设计模式和现代 Java 特性。所有代码都经过充分测试，配有详细注释和文档。

### 🎯 学习内容

- 🧮 **算法与数据结构** - LeetCode 题解，经典算法实现
- 🎨 **设计模式** - GoF 23种设计模式的实战应用
- ☕ **Java 特性** - Java 8/11/17/21 新特性深度解析
- 🛠️ **实用工具** - 生产级别的工具类和代码片段

### ✨ 项目特色

- ✅ **100% 测试覆盖** - 所有代码都有完整的单元测试
- ✅ **生产级质量** - 遵循最佳实践和 SOLID 原则
- ✅ **详细文档** - 完整的注释、复杂度分析和学习笔记
- ✅ **在线阅读** - 精美的文档网站，完美的学习体验
- ✅ **持续集成** - GitHub Actions 自动测试

---

## 🚀 快速开始

### 前置要求

- **Java 21** 或更高版本 ([下载](https://adoptium.net/))
- **Maven 3.6+** ([下载](https://maven.apache.org/download.cgi))
- **Git**

### 克隆并运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/daily-coding.git
cd daily-coding

# 构建项目
mvn clean install

# 运行测试
mvn test

# 运行示例
mvn exec:java -Dexec.mainClass="algorithms.leetcode.TwoSum"
```

### 在 IDE 中打开

**IntelliJ IDEA** (推荐):
1. `File` → `Open` → 选择 `daily-coding` 文件夹
2. 等待 Maven 自动导入依赖
3. 运行任意带 `main()` 方法的类

---

## 📁 项目结构

```
daily-coding/
├── src/main/java/              # 源代码
│   ├── algorithms/             # 算法实现
│   ├── designpatterns/         # 设计模式
│   ├── javafeatures/           # Java 特性演示
│   └── utilities/              # 工具类
├── src/test/java/              # 单元测试
├── docs/                       # 文档内容
│   ├── algorithms/
│   ├── design-patterns/
│   ├── java-features/
│   └── utilities/
└── pom.xml                     # Maven 配置
```

---

## 📊 内容概览

### 🧮 算法与数据结构

| 类别 | 数量 | 状态 |
|------|------|------|
| **数组** | 1 | 🟢 进行中 |
| **字符串** | - | 📝 计划中 |
| **树** | - | 📝 计划中 |
| **图** | - | 📝 计划中 |
| **动态规划** | - | 📝 计划中 |

**[→ 查看详情](./docs/algorithms/README.md)** | **[→ 在线阅读](https://yourusername.github.io/daily-coding/#/docs/algorithms/)**

### 🎨 设计模式

| 类型 | 模式 | 完成度 |
|------|------|--------|
| **创建型** | Singleton, Factory, Builder, Prototype, Abstract Factory | 1/5 |
| **结构型** | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy | 0/7 |
| **行为型** | Observer, Strategy, Command, Template, Iterator, State, ... | 0/11 |

**[→ 查看详情](./docs/design-patterns/README.md)** | **[→ 在线阅读](https://yourusername.github.io/daily-coding/#/docs/design-patterns/)**

### ☕ Java 新特性

| 版本 | 主要特性 | 状态 |
|------|---------|------|
| **Java 8** | Lambda, Stream API, Optional | 📝 计划中 |
| **Java 11** | HTTP Client, var keyword | 📝 计划中 |
| **Java 17** | Records, Sealed Classes, Pattern Matching | 📝 计划中 |
| **Java 21** | Virtual Threads, Sequenced Collections | ✅ 进行中 |

**[→ 查看详情](./docs/java-features/README.md)** | **[→ 在线阅读](https://yourusername.github.io/daily-coding/#/docs/java-features/)**

---

## 🧪 测试

项目使用现代测试框架，保证代码质量：

```bash
# 运行所有测试
mvn test

# 运行特定测试
mvn test -Dtest=TwoSumTest

# 带覆盖率报告
mvn clean test jacoco:report
```

**测试统计**: `31 个测试 | 0 失败 | 0 错误 | 100% 通过率`

---

## 📚 在线文档

本项目配有精美的在线文档网站，提供更好的阅读体验：

**🌐 访问文档**: [https://yourusername.github.io/daily-coding/](https://yourusername.github.io/daily-coding/)

### 文档特色

- 📱 响应式设计，完美适配移动端
- 🔍 全文搜索功能
- 🎨 代码高亮和一键复制
- 📖 清晰的导航和目录
- 🌙 优雅的阅读体验

---

## 🤝 参与贡献

欢迎各种形式的贡献！无论是：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- ✨ 提交代码

请阅读 [贡献指南](CONTRIBUTING.md) 了解详情。

### 如何贡献

```bash
# 1. Fork 本仓库
# 2. 创建特性分支
git checkout -b feature/AmazingFeature

# 3. 提交更改
git commit -m 'feat: add some amazing feature'

# 4. 推送到分支
git push origin feature/AmazingFeature

# 5. 创建 Pull Request
```

---

## 📜 开源协议

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

```
MIT License - 自由使用、修改和分发
```

---

## 🌟 致谢

- **LeetCode** - 提供优秀的算法练习平台
- **Gang of Four** - 经典设计模式著作
- **Oracle** - Java 语言的持续演进
- **开源社区** - 无私的知识分享

---

## 📈 项目统计

![GitHub stars](https://img.shields.io/github/stars/yourusername/daily-coding?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/daily-coding?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/daily-coding?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/yourusername/daily-coding)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/daily-coding)
![GitHub issues](https://img.shields.io/github/issues/yourusername/daily-coding)

---

## 📬 联系方式

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **网站**: [在线文档](https://yourusername.github.io/daily-coding/)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐️ Star！**

*"The only way to learn a new programming language is by writing programs in it."* — Dennis Ritchie

Made with ❤️ for the developer community

</div>
