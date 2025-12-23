# GitHub 配置文件

本目录包含 GitHub 相关的配置文件。

## 📁 目录结构

```
.github/
├── workflows/              # GitHub Actions 工作流
│   └── maven.yml          # Java CI/CD 自动化
├── ISSUE_TEMPLATE/         # Issue 模板
│   ├── bug_report.md      # Bug 报告
│   └── feature_request.md # 功能请求
└── PULL_REQUEST_TEMPLATE.md # PR 模板
```

## 🔧 工作流说明

### maven.yml

自动化测试流程，当代码推送到 `main` 或 `develop` 分支时触发：

- ✅ 在 Java 17 和 21 上测试
- ✅ 编译项目
- ✅ 运行所有单元测试
- ✅ 生成测试报告
- ✅ 代码风格检查

## 📝 模板使用

### Bug 报告

创建 Bug 报告时，系统会自动应用模板，引导填写：
- Bug 描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息

### 功能请求

提交功能建议时，模板会引导填写：
- 功能描述
- 问题陈述
- 解决方案
- 使用示例

### Pull Request

提交 PR 时，模板包含：
- 更改描述
- 更改类型选择
- 测试检查清单
- 代码质量检查

---

这些配置确保项目维护的专业性和规范性。

