import * as React from "react";
import {
  MessageSquare,
  BrainCircuit,
  ImageIcon,
  Search,
  Film,
  FileText,
} from "lucide-react";

export const KNOWLEDGE_BASES_KEY = "ai4free_knowledge_bases";

const icons = {
  MessageSquare,
  BrainCircuit,
  ImageIcon,
  Search,
  Film,
  FileText,
};

export type TagType = "推荐" | "免费" | "热门" | undefined;
export type IframeStrategy = "embed" | "snapshot";
export type IconName = keyof typeof icons;

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  url: string;
  iconName?: IconName;
  icon?: React.ComponentType<any>;
  // new fields
  order?: number; // sorting order (smaller first)
  tag?: TagType; // optional tag
  iframeStrategy?: IframeStrategy; // 必选一项，当在 admin 保存时确保有值
  showOnHome?: boolean; // whether to show on homepage
  category?: string; // 分类显示名称
}

// 用于表单处理的类型
export type KnowledgeBaseFormData = Omit<KnowledgeBase, "icon"> & {
  iconName: IconName;
};

// 用于API响应的类型
export interface KnowledgeBaseResponse {
  success: boolean;
  data?: KnowledgeBase[];
  error?: string;
}

const defaultKnowledgeBases: KnowledgeBase[] = [
  {
    id: "chatgpt",
    name: "国家超算中心",
    description: "deepseek、千问、minimax不限量可用。",
    url: "https://www.scnet.cn/ui/chatbot/",
    iconName: "MessageSquare",
    order: 1,
    tag: "推荐",
    iframeStrategy: "embed",
    showOnHome: true,
    category: "聊天",
  },
  {
    id: "claude",
    name: "海外GPT模型",
    description: "不限次、免注册、GPT4.1系列国内可用",
    url: "https://freeai.aihub.ren/chat",
    iconName: "BrainCircuit",
    order: 2,
    tag: "免费",
    iframeStrategy: "embed",
    showOnHome: true,
    category: "聊天",
  },
  {
    id: "midjourney",
    name: "prompt提示词",
    description: "在线查询、收录全网高频提词库",
    url: "https://www.aishort.top/",
    iconName: "ImageIcon",
    order: 3,
    tag: undefined,
    iframeStrategy: "snapshot",
    showOnHome: true,
    category: "图片",
  },
  {
    id: "perplexity",
    name: "数据报告搜索",
    description: "行业报告、数据剖析、深度分析报告",
    url: "https://dongcha.info/",
    iconName: "Search",
    order: 4,
    tag: "热门",
    iframeStrategy: "embed",
    showOnHome: false,
    category: "搜索",
  },
  {
    id: "Runway",
    name: "AgentTeam工作流工具",
    description: "在线编排、支持自用api、多智能体工作流",
    url: "https://think-five.vercel.app/",
    iconName: "Film",
    order: 5,
    tag: undefined,
    iframeStrategy: "snapshot",
    showOnHome: false,
    category: "工作流",
  },
  {
    id: "notion",
    name: "prompt指令调优工具",
    description: "同模型/不同模型效果对比、参数调优/结构化",
    url: "https://my-puce-two.vercel.app/",
    iconName: "FileText",
    order: 6,
    tag: undefined,
    iframeStrategy: "snapshot",
    showOnHome: false,
    category: "工具",
  },
];

export const getKnowledgeBases = (): KnowledgeBase[] => {
  try {
    const storedData = localStorage.getItem(KNOWLEDGE_BASES_KEY);
    const data = storedData ? JSON.parse(storedData) : defaultKnowledgeBases;
    return (
      (data as any[])
        .map((item: any) => ({
          ...item,
          icon:
            (item.iconName && icons[item.iconName as IconName]) ||
            MessageSquare,
        }))
        // ensure sorting by order
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );
  } catch (error) {
    console.error("Failed to parse knowledge bases from localStorage", error);
    return defaultKnowledgeBases
      .map((item) => ({
        ...item,
        icon: (item.iconName && icons[item.iconName]) || MessageSquare,
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
};

export const saveKnowledgeBases = (data: KnowledgeBase[]) => {
  try {
    // Don't store the icon component, only its name
    const dataToStore = data.map(({ icon, ...rest }) => rest);
    localStorage.setItem(KNOWLEDGE_BASES_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.error("Failed to save knowledge bases to localStorage", error);
  }
};
