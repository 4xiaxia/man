import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FontAwesomeIcon,
  FAIcons,
  FontAwesomeIconExample,
} from "@/components/ui/fontawesome-icons";
import { Button } from "@/components/ui/button";

const IconShowcase: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">FontAwesome 图标展示</h1>
        <p className="text-muted-foreground">与项目配色方案完美匹配的图标库</p>
      </div>

      {/* 基础图标展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FAIcons.tools size="lg" />
            基础图标集合
          </CardTitle>
          <CardDescription>常用的功能图标，采用项目主题配色</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.home size="2xl" />
              <span className="text-sm font-medium">首页</span>
              <code className="text-xs text-muted-foreground">fa-home</code>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.search size="2xl" />
              <span className="text-sm font-medium">搜索</span>
              <code className="text-xs text-muted-foreground">fa-search</code>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.chat size="2xl" />
              <span className="text-sm font-medium">聊天</span>
              <code className="text-xs text-muted-foreground">fa-comments</code>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.brain size="2xl" />
              <span className="text-sm font-medium">AI大脑</span>
              <code className="text-xs text-muted-foreground">fa-brain</code>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.database size="2xl" />
              <span className="text-sm font-medium">数据库</span>
              <code className="text-xs text-muted-foreground">fa-database</code>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-accent/10 transition-colors">
              <FAIcons.cloud size="2xl" />
              <span className="text-sm font-medium">云服务</span>
              <code className="text-xs text-muted-foreground">fa-cloud</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 配色方案展示 */}
      <Card>
        <CardHeader className="card-header">
          <CardTitle className="card-title flex items-center gap-2">
            <i
              className="fas fa-palette fa-lg"
              style={{ color: "hsl(var(--primary))" }}
            />
            配色方案
          </CardTitle>
          <CardDescription className="card-description">
            不同主题色彩的图标展示
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center space-y-3">
              <h4 className="font-medium text-primary">Primary</h4>
              <div className="space-y-2">
                <FontAwesomeIcon
                  icon="fas fa-star"
                  color="primary"
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-heart"
                  color="primary"
                  size="xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-thumbs-up"
                  color="primary"
                  size="lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">主要强调色</p>
            </div>

            <div className="text-center space-y-3">
              <h4 className="font-medium text-secondary">Secondary</h4>
              <div className="space-y-2">
                <FontAwesomeIcon
                  icon="fas fa-leaf"
                  color="secondary"
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-seedling"
                  color="secondary"
                  size="xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-tree"
                  color="secondary"
                  size="lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">次要强调色</p>
            </div>

            <div className="text-center space-y-3">
              <h4 className="font-medium text-accent">Accent</h4>
              <div className="space-y-2">
                <FontAwesomeIcon
                  icon="fas fa-magic"
                  color="accent"
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-sparkles"
                  color="accent"
                  size="xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-wand-magic-sparkles"
                  color="accent"
                  size="lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">装饰强调色</p>
            </div>

            <div className="text-center space-y-3">
              <h4 className="font-medium text-muted-foreground">Muted</h4>
              <div className="space-y-2">
                <FontAwesomeIcon
                  icon="fas fa-info-circle"
                  color="muted"
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-question-circle"
                  color="muted"
                  size="xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-ellipsis-h"
                  color="muted"
                  size="lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">辅助信息色</p>
            </div>

            <div className="text-center space-y-3">
              <h4 className="font-medium text-destructive">Destructive</h4>
              <div className="space-y-2">
                <FontAwesomeIcon
                  icon="fas fa-exclamation-triangle"
                  color="destructive"
                  size="2xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-times-circle"
                  color="destructive"
                  size="xl"
                />
                <FontAwesomeIcon
                  icon="fas fa-trash"
                  color="destructive"
                  size="lg"
                />
              </div>
              <p className="text-xs text-muted-foreground">警告危险色</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 尺寸展示 */}
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title flex items-center gap-2">
            <FontAwesomeIcon
              icon="fas fa-expand-arrows-alt"
              color="accent"
              size="lg"
            />
            尺寸规格
          </CardTitle>
          <CardDescription className="card-description">
            从xs到3xl的不同尺寸展示
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content">
          <div className="flex items-end justify-center space-x-6 py-8">
            <div className="text-center space-y-2">
              <FontAwesomeIcon icon="fas fa-rocket" color="primary" size="xs" />
              <p className="text-xs">xs</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon icon="fas fa-rocket" color="primary" size="sm" />
              <p className="text-xs">sm</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon icon="fas fa-rocket" color="primary" />
              <p className="text-xs">default</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon icon="fas fa-rocket" color="primary" size="lg" />
              <p className="text-xs">lg</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon icon="fas fa-rocket" color="primary" size="xl" />
              <p className="text-xs">xl</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon
                icon="fas fa-rocket"
                color="primary"
                size="2xl"
              />
              <p className="text-xs">2xl</p>
            </div>
            <div className="text-center space-y-2">
              <FontAwesomeIcon
                icon="fas fa-rocket"
                color="primary"
                size="3xl"
              />
              <p className="text-xs">3xl</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 动画效果 */}
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title flex items-center gap-2">
            <FontAwesomeIcon icon="fas fa-play" color="accent" size="lg" />
            动画效果
          </CardTitle>
          <CardDescription className="card-description">
            旋转、脉冲等动画效果展示
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content">
          <div className="flex justify-center space-x-8 py-8">
            <div className="text-center space-y-3">
              <FontAwesomeIcon
                icon="fas fa-spinner"
                color="primary"
                size="2xl"
                spin
              />
              <p className="text-sm font-medium">旋转加载</p>
              <code className="text-xs text-muted-foreground">spin</code>
            </div>

            <div className="text-center space-y-3">
              <FontAwesomeIcon
                icon="fas fa-heart"
                color="destructive"
                size="2xl"
                pulse
              />
              <p className="text-sm font-medium">脉冲跳动</p>
              <code className="text-xs text-muted-foreground">pulse</code>
            </div>

            <div className="text-center space-y-3">
              <FontAwesomeIcon
                icon="fas fa-cog"
                color="muted"
                size="2xl"
                spin
              />
              <p className="text-sm font-medium">设置齿轮</p>
              <code className="text-xs text-muted-foreground">spin</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实际应用示例 */}
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title flex items-center gap-2">
            <i
              className="fas fa-code fa-lg"
              style={{ color: "hsl(var(--secondary))" }}
            />
            实际应用示例
          </CardTitle>
          <CardDescription className="card-description">
            在按钮、导航等组件中的使用示例
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content space-y-6">
          {/* 按钮示例 */}
          <div>
            <h4 className="font-medium mb-3">按钮中的图标</h4>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <FAIcons.plus size="sm" />
                新建项目
              </Button>

              <Button variant="outline" className="gap-2">
                <FAIcons.download size="sm" />
                下载文件
              </Button>

              <Button variant="destructive" className="gap-2">
                <FAIcons.trash size="sm" />
                删除
              </Button>

              <Button variant="secondary" className="gap-2">
                <FAIcons.settings size="sm" />
                设置
              </Button>
            </div>
          </div>

          {/* 导航示例 */}
          <div>
            <h4 className="font-medium mb-3">导航菜单</h4>
            <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
              <Button variant="ghost" size="sm" className="gap-2">
                <FAIcons.home size="sm" />
                首页
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <FAIcons.search size="sm" />
                搜索
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <FAIcons.user size="sm" />
                用户
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <FAIcons.settings size="sm" />
                设置
              </Button>
            </div>
          </div>

          {/* 状态指示 */}
          <div>
            <h4 className="font-medium mb-3">状态指示</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FAIcons.success size="sm" />
                <span className="text-sm">操作成功完成</span>
              </div>
              <div className="flex items-center gap-2">
                <FAIcons.warning size="sm" />
                <span className="text-sm">请注意检查输入</span>
              </div>
              <div className="flex items-center gap-2">
                <FAIcons.error size="sm" />
                <span className="text-sm">发生错误，请重试</span>
              </div>
              <div className="flex items-center gap-2">
                <FAIcons.loading size="sm" />
                <span className="text-sm">正在处理中...</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 使用指南 */}
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title flex items-center gap-2">
            <i
              className="fas fa-book fa-lg"
              style={{ color: "hsl(var(--primary))" }}
            />
            使用指南
          </CardTitle>
          <CardDescription className="card-description">
            如何在项目中使用FontAwesome图标
          </CardDescription>
        </CardHeader>
        <CardContent className="card-content space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. 导入组件</h4>
            <code className="block bg-muted p-3 rounded text-sm">
              {`import { FontAwesomeIcon, FAIcons } from '@/components/ui/fontawesome-icons';`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">2. 使用预定义图标</h4>
            <code className="block bg-muted p-3 rounded text-sm">
              {`<FAIcons.home size="lg" />
<FAIcons.search color="primary" />
<FAIcons.loading spin />`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. 使用自定义图标</h4>
            <code className="block bg-muted p-3 rounded text-sm">
              {`<FontAwesomeIcon 
  icon="fas fa-custom-icon" 
  color="primary" 
  size="xl" 
  spin={true} 
/>`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">4. 查找更多图标</h4>
            <p className="text-sm text-muted-foreground mb-2">
              访问{" "}
              <a
                href="https://fontawesome.com/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                FontAwesome 官网
              </a>{" "}
              查找更多图标
            </p>
            <div className="flex items-center gap-2 text-sm">
              <FAIcons.externalLink size="sm" />
              <a
                href="https://fontawesome.com/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://fontawesome.com/icons
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconShowcase;
