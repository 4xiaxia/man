import * as React from "react";
import { Card } from "@/components/ui/card";

export const PromoBanner = () => {
  return (
    <div className="space-y-6">
      {/* 主要的共建知识库卡片 */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 border-orange-200/60 p-6 cursor-pointer transition-all duration-200 hover:shadow-md min-h-[200px] flex flex-col justify-center items-center text-center">
        <div className="absolute top-4 left-4">
          <div className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            限时优惠
          </div>
        </div>

        <div className="mb-4">
          <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl text-white">📚</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800">共建知识库</h3>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-orange-600 font-medium">💰</span>
            <span className="text-sm font-medium text-orange-700">
              知识创造收入
            </span>
          </div>
          <p className="text-sm text-gray-600 max-w-xs">
            参与知识建设，分享收益奖励，获得专属收入
          </p>
        </div>
      </Card>
    </div>
  );
};
