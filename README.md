# React TypeScript 登录页面

这是一个使用 React + TypeScript 构建的现代化登录页面。

## 功能特点

- ✨ 现代化的设计风格
- 🎨 渐变背景和毛玻璃效果
- 📱 完全响应式设计
- 🔐 表单验证功能
- 👁️ 密码显示/隐藏切换
- 🔄 登录/注册模式切换
- ⚡ TypeScript 类型安全
- 🎯 交互动画效果

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (图标)

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看页面。

### 构建生产版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 项目结构

```
src/
  components/
    LoginPage.tsx     # 登录页面组件
  App.tsx            # 主应用组件
  index.tsx          # 入口文件
  App.css            # 应用样式
  index.css          # 全局样式
```

## 自定义

你可以通过修改以下文件来自定义页面：

- `src/components/LoginPage.tsx` - 修改组件逻辑和结构
- 颜色主题可以通过 Tailwind CSS 类来调整
- 在 `package.json` 中修改 `homepage` 字段为你的 GitHub Pages URL

## 许可证

MIT License