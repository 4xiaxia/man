import * as React from "react";
import { useNavigation } from "../navigation/NavigationProvider";
import { HomePage } from "../pages/HomePage";
import { KnowledgePage } from "../pages/KnowledgePage";
import { KnowledgeBasePage } from "../pages/KnowledgeBasePage";
import { ToolsPage } from "../pages/ToolsPage";
import { LLMAgentPage } from "../pages/LLMAgentPage";
import TrendingPage from "../pages/TrendingPage";
import { AdminPanel } from "../admin/AdminPanel";

export const ContentArea = () => {
  const { activeTab } = useNavigation();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "knowledge":
        return <KnowledgeBasePage />;
      case "tools": // Corresponds to 'llm&agent'
        return <LLMAgentPage />;
      case "trending": // Corresponds to 'free chat'
        return <TrendingPage />;
      case "admin": // Admin panel
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex-1 p-6 pb-24 overflow-hidden">
      <div className="h-full">{renderContent()}</div>
    </div>
  );
};
