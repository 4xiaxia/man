import * as React from "react";
import { Home, Book, Layers, TrendingUp, Settings } from "lucide-react";
import { useNavigation } from "./NavigationProvider";

const navItems = [
  { id: "home", label: "首页", icon: Home },
  { id: "knowledge", label: "知识库", icon: Book },
  { id: "tools", label: "LLM & Agent", icon: Layers },
  { id: "trending", label: "免费聊天", icon: TrendingUp },
  { id: "admin", label: "管理后台", icon: Settings },
];

export const MainNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-2 bg-white/70 backdrop-blur-lg rounded-full shadow-lg border border-gray-200">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === item.id
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
