import * as React from "react";
import { Card } from "@/components/ui/card";
import { MainNavigation } from "../navigation/MainNavigation";
import { ContentArea } from "./ContentArea";
import { useClickEffect } from "../effects/useClickEffect";
import { Settings } from "lucide-react";

export const MainContainer: React.FC = () => {
  const { createClickEffect, effectsContainer } = useClickEffect();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    createClickEffect(e);
  };

  const handleAdminClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent card click effect
    window.history.pushState({}, "", "/admin");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-[5vh] px-4 relative overflow-hidden scrollbar-hide">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/20" />

      <Card
        className="w-[95vw] h-[95vh] relative bg-white/80 backdrop-blur-sm rounded-[26px] shadow-clay overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative h-full flex flex-col">
          <ContentArea />
          <MainNavigation />
        </div>
      </Card>

      {effectsContainer}



      {/* 切换对话框 */}
    </div>
  );
};
