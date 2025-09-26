import * as React from "react";
import { Home, BookOpen, Cpu, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "../navigation/NavigationProvider";

export const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

  const navItems = [
    { id: "home", label: "首页", icon: Home },
    { id: "knowledge", label: "知识库", icon: BookOpen },
    { id: "tools", label: "LLM & Agent", icon: Cpu },
    { id: "trending", label: "自由对话", icon: Cloud },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      {/* 渐变毛玻璃样式：由内向外渐渐不透明 */}
      <div className="bg-gradient-to-t from-white/50 via-white/70 to-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl relative overflow-hidden">
        {/* 内层渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex justify-around items-center p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-4 h-auto text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-accent-foreground font-medium rounded-md"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {/* 应用统一的 icon-sm 尺寸 */}
                  <Icon className="icon-sm" />
                  <span className="text-center leading-tight">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
