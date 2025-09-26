# 系统架构文档

## 1. 系统概述

本项目是一个集成了知识库、LLM & Agent 学习和免费聊天工具的多功能应用。主要功能包括：

- 首页展示应用概览和最新资讯。
- 知识库分类展示学习资源。
- LLM & Agent 学习模块提供前沿知识。
- FREE CHAT 模块集成多个聊天工具。

## 2. 技术栈

### 前端

- **框架**: React
- **路由管理**: React Router
- **状态管理**: React Context
- **UI 组件库**: 自定义组件（如 `Card`, `Button`, `Input`）
- **样式管理**: Tailwind CSS + 自定义样式工具

### 后端

- **API 交互**: 通过 RESTful API 与后端服务通信（如 `freeai.aihub.ren/chat`）

### 工具与配置

- **本地存储**: `localStorage`
- **环境配置**: 支持暗黑模式（`prefers-color-scheme`）

## 3. 目录结构

```
/workspaces/ni
├── client/              # 前端代码
│   ├── src/             # 源代码
│   │   ├── components/  # 公共组件
│   │   ├── data/        # 数据管理
│   │   ├── pages/       # 页面组件
│   │   └── App.js       # 主入口
│   └── ...
├── dist/                # 构建输出
├── server/              # 后端代码（如有）
└── ...
```

## 4. 核心模块

### 首页 (`ed`)

- 展示应用概览、最新资讯、福利羊毛等。

### 知识库 (`Hg`)

- 分类展示学习资源（如计算机科学、数学等）。

### LLM & Agent (`Qg`)

- 展示智能体和大型语言模型的学习资源。

### FREE CHAT (`Kg`)

- 集成多个聊天工具（如国家超算中心、海外GPT模型）。

## 5. 数据流

1. **前端数据流**: 通过 React Context 和 `localStorage` 管理状态和数据。
2. **API 交互**: 通过 `fetch` 或类似工具与后端通信。

## 6. 部署与构建

- **构建工具**: Vite
- **部署**: 静态文件部署（如 Vercel、Netlify）

## 后续建议

1. 补充后端架构文档（如使用 Node.js + Express 或类似框架）。
2. 细化模块间的数据流和接口定义。
3. 添加测试和监控方案。
