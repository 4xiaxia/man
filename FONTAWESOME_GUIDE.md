# FontAwesome 图标使用指南

## 概述

本项目已集成 FontAwesome 6.5.1 图标库，并提供了与项目设计系统完美匹配的配色方案和组件封装。

## 🎨 配色方案

项目采用 HSL 色彩空间，支持浅色和深色主题自动切换：

### 主要颜色

- **Primary (主色)**: `hsl(250 60% 70%)` - 薰衣草紫，用于主要操作和强调
- **Secondary (次色)**: `hsl(150 50% 90%)` - 薄荷绿，用于次要操作和成功状态
- **Accent (强调色)**: `hsl(250 60% 95%)` - 浅紫色，用于装饰和特殊强调
- **Muted (静音色)**: `hsl(220 10% 40%)` - 灰色，用于辅助信息
- **Destructive (危险色)**: `hsl(0 84.2% 60.2%)` - 红色，用于警告和错误

### 深色主题适配

所有颜色在深色主题下会自动调整，确保良好的对比度和可读性。

## 📦 安装和引用

### CDN 引用

项目已在 `client/index.html` 中引用了 FontAwesome CDN：

```html
<!-- FontAwesome 图标库 -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>

<!-- FontAwesome 主题配色 -->
<link rel="stylesheet" href="/css/fontawesome-theme.css" />
```

### 组件导入

```typescript
import { FontAwesomeIcon, FAIcons } from "@/components/ui/fontawesome-icons";
```

## 🚀 使用方法

### 1. 使用预定义图标组件

```tsx
// 基础使用
<FAIcons.home />
<FAIcons.search />
<FAIcons.user />

// 带尺寸
<FAIcons.home size="lg" />
<FAIcons.search size="2xl" />

// 带动画
<FAIcons.loading spin />
<FAIcons.heart pulse />
```

### 2. 使用自定义图标

```tsx
<FontAwesomeIcon icon="fas fa-rocket" color="primary" size="xl" spin={false} />
```

### 3. 在按钮中使用

```tsx
<Button className="gap-2">
  <FAIcons.plus size="sm" />
  新建项目
</Button>

<Button variant="destructive" className="gap-2">
  <FAIcons.trash size="sm" />
  删除
</Button>
```

## 🎯 预定义图标集合

### 导航图标

- `FAIcons.home` - 首页
- `FAIcons.search` - 搜索
- `FAIcons.user` - 用户
- `FAIcons.settings` - 设置

### 功能图标

- `FAIcons.chat` - 聊天
- `FAIcons.brain` - AI大脑
- `FAIcons.image` - 图片
- `FAIcons.database` - 数据库
- `FAIcons.tools` - 工具
- `FAIcons.cloud` - 云服务

### 状态图标

- `FAIcons.loading` - 加载中（带旋转动画）
- `FAIcons.success` - 成功
- `FAIcons.error` - 错误
- `FAIcons.warning` - 警告

### 操作图标

- `FAIcons.plus` - 添加
- `FAIcons.edit` - 编辑
- `FAIcons.trash` - 删除
- `FAIcons.download` - 下载
- `FAIcons.upload` - 上传

## 📏 尺寸规格

支持以下尺寸：

- `xs` - 0.75rem
- `sm` - 0.875rem
- `default` - 1rem
- `lg` - 1.25rem
- `xl` - 1.5rem
- `2xl` - 2rem
- `3xl` - 3rem

## 🎭 动画效果

### 旋转动画

```tsx
<FAIcons.loading spin />
<FontAwesomeIcon icon="fas fa-cog" spin />
```

### 脉冲动画

```tsx
<FAIcons.heart pulse />
<FontAwesomeIcon icon="fas fa-heart" pulse />
```

## 🎨 CSS 类使用

### 基础配色类

```css
.fa-primary {
  color: hsl(var(--primary));
}
.fa-secondary {
  color: hsl(var(--secondary));
}
.fa-accent {
  color: hsl(var(--accent));
}
.fa-muted {
  color: hsl(var(--muted-foreground));
}
.fa-destructive {
  color: hsl(var(--destructive));
}
```

### 特殊效果类

```css
.fa-glow {
  filter: drop-shadow(0 0 8px currentColor);
}
.fa-soft-shadow {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
.fa-gradient-primary {
  /* 渐变效果 */
}
```

### 场景应用类

```css
.nav-icon {
  /* 导航图标样式 */
}
.btn-icon {
  /* 按钮图标样式 */
}
.status-icon {
  /* 状态图标样式 */
}
.card-icon {
  /* 卡片图标样式 */
}
```

## 🔍 图标查找

访问 [FontAwesome 官网](https://fontawesome.com/icons) 查找更多图标：

1. 进入 https://fontawesome.com/icons
2. 搜索所需图标
3. 复制图标的 CSS 类名（如 `fas fa-home`）
4. 在项目中使用

### 图标分类

- **fas** - Solid 实心图标
- **far** - Regular 常规图标
- **fab** - Brands 品牌图标
- **fal** - Light 轻量图标（Pro版本）
- **fad** - Duotone 双色图标（Pro版本）

## 📱 响应式设计

图标支持响应式尺寸：

```css
.fa-responsive {
  font-size: 1rem; /* 移动端 */
  font-size: 1.25rem; /* 平板端 */
  font-size: 1.5rem; /* 桌面端 */
}
```

## 🎯 最佳实践

### 1. 语义化使用

选择符合功能语义的图标，如：

- 使用 `fa-home` 表示首页
- 使用 `fa-search` 表示搜索
- 使用 `fa-user` 表示用户相关

### 2. 保持一致性

在同一功能模块中使用相同风格的图标（如都使用 solid 或都使用 regular）。

### 3. 适当的尺寸

- 导航图标：`lg` 或 `xl`
- 按钮图标：`sm` 或默认
- 装饰图标：`2xl` 或 `3xl`
- 状态指示：`sm`

### 4. 配色选择

- 主要操作：`primary`
- 成功状态：`secondary`
- 装饰元素：`accent`
- 辅助信息：`muted`
- 警告错误：`destructive`

### 5. 动画使用

谨慎使用动画，避免过度使用影响用户体验：

- 加载状态：使用 `spin`
- 心跳效果：使用 `pulse`
- 避免在静态内容中使用动画

## 🔧 自定义扩展

### 添加新的预定义图标

在 `fontawesome-icons.tsx` 中添加：

```typescript
export const FAIcons = {
  // 现有图标...

  // 新增图标
  customIcon: (props: Omit<FontAwesomeIconProps, 'icon'>) => (
    <FontAwesomeIcon icon="fas fa-custom" color="primary" {...props} />
  ),
};
```

### 自定义配色

在 `fontawesome-theme.css` 中添加新的颜色类：

```css
.fa-custom-color {
  color: hsl(180 50% 50%); /* 自定义颜色 */
}
```

## 📖 示例页面

访问 `/icons` 路由查看完整的图标展示页面，包含：

- 基础图标集合
- 配色方案展示
- 尺寸规格对比
- 动画效果演示
- 实际应用示例
- 使用代码示例

## 🐛 常见问题

### Q: 图标不显示？

A: 检查 FontAwesome CDN 是否正确加载，确保网络连接正常。

### Q: 图标颜色不正确？

A: 确保使用了正确的颜色属性，检查 CSS 变量是否正确定义。

### Q: 动画不生效？

A: 确保 `fontawesome-theme.css` 文件已正确加载。

### Q: 自定义图标找不到？

A: 检查图标类名是否正确，确认图标在 FontAwesome 免费版本中可用。

---

**注意**: 本项目使用 FontAwesome 免费版本，部分 Pro 版本图标可能不可用。如需使用 Pro 版本，请购买相应许可证并更新 CDN 链接。
