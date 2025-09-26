import React from "react";
import { cn } from "@/lib/utils";

// FontAwesome 图标组件接口
interface FontAwesomeIconProps {
  icon: string; // FontAwesome 图标类名，如 'fas fa-home'
  className?: string;
  size?: "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl";
  color?: "primary" | "secondary" | "accent" | "muted" | "destructive";
  spin?: boolean;
  pulse?: boolean;
}

// 颜色和尺寸现在通过CSS类处理，无需JavaScript映射

export const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = ({
  icon,
  className,
  size,
  color,
  spin = false,
  pulse = false,
}) => {
  const iconClasses = cn(
    "fa-icon",
    icon,
    {
      "fa-spin": spin,
      "fa-pulse": pulse,
      [`fa-${size}`]: size,
      [`fa-${color}`]: color,
    },
    className,
  );

  return <i className={iconClasses} />;
};

// 预定义的图标组件，与项目配色方案匹配
export const FAIcons = {
  // 导航图标
  home: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-home" color="primary" {...props} />
  ),
  search: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-search" color="primary" {...props} />
  ),
  user: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-user" color="primary" {...props} />
  ),
  settings: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-cog" color="muted" {...props} />
  ),

  // 功能图标
  chat: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-comments" color="accent" {...props} />
  ),
  brain: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-brain" color="secondary" {...props} />
  ),
  image: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-image" color="accent" {...props} />
  ),
  database: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-database" color="primary" {...props} />
  ),
  tools: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-tools" color="muted" {...props} />
  ),
  cloud: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-cloud" color="secondary" {...props} />
  ),

  // 状态图标
  loading: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-spinner" spin color="primary" {...props} />
  ),
  success: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-check-circle" color="secondary" {...props} />
  ),
  error: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon
      icon="fas fa-exclamation-circle"
      color="destructive"
      {...props}
    />
  ),
  warning: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon
      icon="fas fa-exclamation-triangle"
      color="destructive"
      {...props}
    />
  ),

  // 箭头和导航
  arrowRight: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-arrow-right" color="muted" {...props} />
  ),
  arrowLeft: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-arrow-left" color="muted" {...props} />
  ),
  chevronRight: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-chevron-right" color="muted" {...props} />
  ),
  chevronLeft: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-chevron-left" color="muted" {...props} />
  ),

  // 社交和外部链接
  externalLink: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon
      icon="fas fa-external-link-alt"
      color="primary"
      {...props}
    />
  ),
  github: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fab fa-github" color="muted" {...props} />
  ),
  twitter: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fab fa-twitter" color="primary" {...props} />
  ),

  // 文档和文件
  file: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-file" color="muted" {...props} />
  ),
  fileText: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-file-alt" color="muted" {...props} />
  ),
  download: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-download" color="primary" {...props} />
  ),
  upload: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-upload" color="primary" {...props} />
  ),

  // 主题切换
  sun: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-sun" color="accent" {...props} />
  ),
  moon: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-moon" color="primary" {...props} />
  ),

  // 关闭和删除
  close: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-times" color="muted" {...props} />
  ),
  trash: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-trash" color="destructive" {...props} />
  ),

  // 添加和编辑
  plus: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-plus" color="primary" {...props} />
  ),
  edit: (props: Omit<FontAwesomeIconProps, "icon">) => (
    <FontAwesomeIcon icon="fas fa-edit" color="primary" {...props} />
  ),
};

// 使用示例组件
export const FontAwesomeIconExample: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">FontAwesome 图标示例</h3>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center space-y-2">
          <FAIcons.home size="2xl" />
          <span className="text-sm text-muted-foreground">首页</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <FAIcons.chat size="2xl" />
          <span className="text-sm text-muted-foreground">聊天</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <FAIcons.brain size="2xl" />
          <span className="text-sm text-muted-foreground">AI</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <FAIcons.loading size="2xl" />
          <span className="text-sm text-muted-foreground">加载中</span>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-md font-medium mb-2">不同尺寸示例</h4>
        <div className="flex items-center space-x-4">
          <FAIcons.search size="xs" />
          <FAIcons.search size="sm" />
          <FAIcons.search />
          <FAIcons.search size="lg" />
          <FAIcons.search size="xl" />
          <FAIcons.search size="2xl" />
        </div>
      </div>
    </div>
  );
};
