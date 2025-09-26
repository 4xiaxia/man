import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Edit, Trash2, ExternalLink, FileText, Globe, Code } from "lucide-react";

// 专题数据类型定义
export interface LLMAgentTopic {
  id: string;
  name: string; // 专题名
  category: string; // ANP分类分类名称
  order: number; // 专题排序
  cardColor: string; // 卡片颜色
  articles: LLMAgentArticle[]; // 专题下属文章
}

export interface LLMAgentArticle {
  id: string;
  title: string;
  order: number; // 文章展示顺序
  contentType: "external" | "iframe" | "richtext" | "api"; // 内容类型
  content: string; // 根据类型存储不同内容：URL、富文本内容等
  description?: string; // 文章描述
}

// 默认专题数据
const defaultTopics: LLMAgentTopic[] = [
  {
    id: "ai-models",
    name: "AI模型集合",
    category: "模型工具",
    order: 1,
    cardColor: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    articles: [
      {
        id: "chatgpt",
        title: "ChatGPT 使用指南",
        order: 1,
        contentType: "external",
        content: "https://chat.openai.com",
        description: "OpenAI 的 ChatGPT 官方网站"
      },
      {
        id: "claude",
        title: "Claude AI 助手",
        order: 2,
        contentType: "external",
        content: "https://claude.ai",
        description: "Anthropic 的 Claude AI 助手"
      },
      {
        id: "gemini",
        title: "Google Gemini",
        order: 3,
        contentType: "iframe",
        content: "https://gemini.google.com",
        description: "Google 的 Gemini AI 模型"
      }
    ]
  },
  {
    id: "prompt-engineering",
    name: "提示词工程",
    category: "技术教程",
    order: 2,
    cardColor: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    articles: [
      {
        id: "prompt-basics",
        title: "提示词基础教程",
        order: 1,
        contentType: "richtext",
        content: `# 提示词工程基础

## 什么是提示词工程？

提示词工程是一门设计和优化输入提示的艺术和科学，以获得AI模型更好的输出结果。

## 基本原则

1. **明确性**: 提示应该清晰、具体
2. **上下文**: 提供足够的背景信息
3. **结构化**: 使用结构化的格式
4. **迭代优化**: 不断测试和改进

## 常用技巧

### 角色扮演
\`\`\`
你是一位经验丰富的数据科学家，请帮我分析这个数据集...
\`\`\`

### 分步思考
\`\`\`
请一步步分析这个问题：
1. 首先理解问题的核心
2. 然后列出可能的解决方案
3. 最后选择最佳方案并说明理由
\`\`\`

### 示例驱动
\`\`\`
请按照以下格式回答：
输入：问题描述
输出：解决方案
理由：选择该方案的原因
\`\`\`
`,
        description: "学习如何编写有效的AI提示词"
      },
      {
        id: "advanced-prompts",
        title: "高级提示词技巧",
        order: 2,
        contentType: "external",
        content: "https://www.promptingguide.ai",
        description: "深入学习高级提示词技巧"
      }
    ]
  },
  {
    id: "ai-tools",
    name: "AI工具箱",
    category: "实用工具",
    order: 3,
    cardColor: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    articles: [
      {
        id: "midjourney",
        title: "Midjourney 图像生成",
        order: 1,
        contentType: "external",
        content: "https://www.midjourney.com",
        description: "强大的AI图像生成工具"
      },
      {
        id: "stable-diffusion",
        title: "Stable Diffusion 本地部署",
        order: 2,
        contentType: "richtext",
        content: `# Stable Diffusion 本地部署指南

## 系统要求

- NVIDIA GPU (推荐 8GB+ VRAM)
- Python 3.8+
- Git

## 安装步骤

### 1. 克隆仓库
\`\`\`bash
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui
\`\`\`

### 2. 运行安装脚本
\`\`\`bash
./webui.sh
\`\`\`

### 3. 下载模型
将模型文件放置在 \`models/Stable-diffusion/\` 目录下

## 使用技巧

1. **正向提示词**: 描述你想要的内容
2. **负向提示词**: 描述你不想要的内容
3. **参数调整**: 
   - Steps: 20-50 (采样步数)
   - CFG Scale: 7-12 (提示词相关性)
   - Size: 512x512 或 768x768

## 常用提示词模板

### 人物肖像
\`\`\`
portrait of a beautiful woman, detailed face, realistic, photorealistic, 8k, high quality
Negative: blurry, low quality, distorted
\`\`\`

### 风景画
\`\`\`
beautiful landscape, mountains, lake, sunset, cinematic lighting, highly detailed
Negative: people, buildings, cars
\`\`\`
`,
        description: "本地部署 Stable Diffusion 的完整指南"
      }
    ]
  }
];

// 存储键
const LLMAGENT_TOPICS_KEY = "ai4free_llmagent_topics";

// 数据管理函数
export const getLLMAgentTopics = (): LLMAgentTopic[] => {
  try {
    const storedData = localStorage.getItem(LLMAGENT_TOPICS_KEY);
    return storedData ? JSON.parse(storedData) : defaultTopics;
  } catch (error) {
    console.error("Failed to parse LLMAgent topics from localStorage", error);
    return defaultTopics;
  }
};

export const saveLLMAgentTopics = (topics: LLMAgentTopic[]) => {
  try {
    localStorage.setItem(LLMAGENT_TOPICS_KEY, JSON.stringify(topics));
  } catch (error) {
    console.error("Failed to save LLMAgent topics to localStorage", error);
  }
};

// 专题卡片组件
interface TopicCardProps {
  topic: LLMAgentTopic;
  onEdit: (topic: LLMAgentTopic) => void;
  onDelete: (id: string) => void;
  onView: (topic: LLMAgentTopic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onEdit, onDelete, onView }) => {
  return (
    <Card 
      className={`${topic.cardColor} p-6 cursor-pointer hover:shadow-lg transition-all duration-300 relative group`}
      onClick={() => onView(topic)}
    >
      {/* 管理按钮 */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 hover:bg-white/50"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(topic);
          }}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 hover:bg-red-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(topic.id);
          }}
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>
      </div>

      {/* 专题标题 */}
      <h3 className="font-bold text-lg text-gray-800 mb-2">{topic.name}</h3>
      
      {/* 分类标签 */}
      <Badge variant="secondary" className="mb-4">
        {topic.category}
      </Badge>

      {/* 文章列表预览 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">包含文章 ({topic.articles.length}):</p>
        {topic.articles.slice(0, 3).map((article) => (
          <div key={article.id} className="flex items-center gap-2 text-sm text-gray-700">
            {article.contentType === "external" && <ExternalLink className="h-3 w-3" />}
            {article.contentType === "iframe" && <Globe className="h-3 w-3" />}
            {article.contentType === "richtext" && <FileText className="h-3 w-3" />}
            {article.contentType === "api" && <Code className="h-3 w-3" />}
            <span className="truncate">{article.title}</span>
          </div>
        ))}
        {topic.articles.length > 3 && (
          <p className="text-xs text-gray-500">还有 {topic.articles.length - 3} 篇文章...</p>
        )}
      </div>
    </Card>
  );
};

// 专题详情弹窗组件
interface TopicDetailModalProps {
  topic: LLMAgentTopic | null;
  isOpen: boolean;
  onClose: () => void;
}

const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, isOpen, onClose }) => {
  const [selectedArticle, setSelectedArticle] = React.useState<LLMAgentArticle | null>(null);

  React.useEffect(() => {
    if (topic && topic.articles.length > 0) {
      setSelectedArticle(topic.articles[0]);
    }
  }, [topic]);

  if (!topic) return null;

  const renderArticleContent = (article: LLMAgentArticle) => {
    switch (article.contentType) {
      case "external":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <ExternalLink className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">此内容将在新窗口中打开</p>
              <Button
                onClick={() => window.open(article.content, '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                打开链接
              </Button>
            </div>
          </div>
        );
      case "iframe":
        return (
          <div className="h-full relative">
            {/* 隐藏滚动条的遮罩效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none z-10" />
            <iframe
              src={article.content}
              className="w-full h-full border-0 rounded-md"
              title={article.title}
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            />
            <style jsx>{`
              iframe::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        );
      case "richtext":
        return (
          <ScrollArea className="h-full">
            <div className="prose prose-sm max-w-none p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {article.content}
              </pre>
            </div>
          </ScrollArea>
        );
      case "api":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">API 接口功能开发中...</p>
            </div>
          </div>
        );
      default:
        return <div>未知内容类型</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              {topic.name}
              <Badge variant="secondary">{topic.category}</Badge>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧文章列表 */}
          <div className="w-80 border-r bg-gray-50 p-4">
            <h4 className="font-semibold mb-4">文章列表</h4>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {topic.articles
                  .sort((a, b) => a.order - b.order)
                  .map((article) => (
                    <Card
                      key={article.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        selectedArticle?.id === article.id
                          ? 'bg-blue-100 border-blue-300'
                          : 'hover:bg-white'
                      }`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-start gap-2">
                        {article.contentType === "external" && <ExternalLink className="h-4 w-4 mt-0.5 text-gray-500" />}
                        {article.contentType === "iframe" && <Globe className="h-4 w-4 mt-0.5 text-gray-500" />}
                        {article.contentType === "richtext" && <FileText className="h-4 w-4 mt-0.5 text-gray-500" />}
                        {article.contentType === "api" && <Code className="h-4 w-4 mt-0.5 text-gray-500" />}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm truncate">{article.title}</h5>
                          {article.description && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {article.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 flex flex-col">
            {selectedArticle && (
              <>
                <div className="p-4 border-b bg-white">
                  <h3 className="font-semibold text-lg">{selectedArticle.title}</h3>
                  {selectedArticle.description && (
                    <p className="text-sm text-gray-600 mt-1">{selectedArticle.description}</p>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  {renderArticleContent(selectedArticle)}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 主页面组件
export const LLMAgentPage: React.FC = () => {
  const [topics, setTopics] = React.useState<LLMAgentTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = React.useState<LLMAgentTopic | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

  React.useEffect(() => {
    const data = getLLMAgentTopics();
    setTopics(data);
  }, []);

  const handleEdit = (topic: LLMAgentTopic) => {
    // TODO: 实现编辑功能
    console.log("Edit topic:", topic);
  };

  const handleDelete = (id: string) => {
    const updatedTopics = topics.filter(topic => topic.id !== id);
    setTopics(updatedTopics);
    saveLLMAgentTopics(updatedTopics);
  };

  const handleView = (topic: LLMAgentTopic) => {
    setSelectedTopic(topic);
    setIsDetailModalOpen(true);
  };

  const handleAdd = () => {
    // TODO: 实现添加功能
    console.log("Add new topic");
  };

  return (
    <div className="h-full flex flex-col">
      {/* 页面头部 */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-white/40 via-white/60 to-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">LLM & Agent</h1>
          <p className="text-sm text-gray-600 mt-1">专题式内容管理</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          添加专题
        </Button>
      </div>

      {/* 专题网格 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics
            .sort((a, b) => a.order - b.order)
            .map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      <TopicDetailModal
        topic={selectedTopic}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTopic(null);
        }}
      />
    </div>
  );
};
