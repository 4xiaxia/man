import * as React from "react";
import { ContentCard } from "../content/ContentCard";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

export const ToolsPage = () => {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          LLM & Agent 学习
        </h1>
        <p className="text-gray-600 text-sm">
          探索智能体和大型语言模型的前沿知识
        </p>
      </div>

      <Section title="Agent LLM">
        <ContentCard
          title="大型语言模型基础"
          description="最新更新：Transformer 架构深度解析"
          layout="one-third"
          color="from-blue-50/80 to-indigo-100/50"
          className="text-left"
        />
        <ContentCard
          title="Agent 架构模式"
          description="最新更新：ReAct 模式在复杂任务中的应用"
          layout="one-third"
          color="from-purple-50/80 to-pink-100/50"
          className="text-left"
        />
        <ContentCard
          title="多智能体系统"
          description="最新更新：协作与竞争模型分析"
          layout="one-third"
          color="from-green-50/80 to-teal-100/50"
          className="text-left"
        />
      </Section>

      <Section title="工作流 Workflow">
        <ContentCard
          title="工作流自动化"
          description="最新更新：使用 Agentic Workflow 实现端到端自动化"
          layout="one-third"
          color="from-orange-50/80 to-red-100/50"
          className="text-left"
        />
        <ContentCard
          title="LangChain & LlamaIndex"
          description="最新更新：高级 RAG 技术的比较"
          layout="one-third"
          color="from-yellow-50/80 to-orange-100/50"
          className="text-left"
        />
        <ContentCard
          title="任务规划与分解"
          description="最新更新：思维树 (ToT) 方法实践"
          layout="one-third"
          color="from-teal-50/80 to-cyan-100/50"
          className="text-left"
        />
      </Section>

      <Section title="通信协议 (MCP / ANP)">
        <ContentCard
          title="多智能体通信协议 (MCP)"
          description="最新更新：MCP v2.1 规范解读"
          layout="one-third"
          color="from-rose-50/80 to-pink-100/50"
          className="text-left"
        />
        <ContentCard
          title="智能体网络协议 (ANP)"
          description="最新更新：ANP 在去中心化网络中的应用"
          layout="one-third"
          color="from-violet-50/80 to-purple-100/50"
          className="text-left"
        />
        <ContentCard
          title="协议设计与实现"
          description="最新更新：构建可扩展的 Agent 通信层"
          layout="one-third"
          color="from-sky-50/80 to-blue-100/50"
        />
      </Section>
    </div>
  );
};
