import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Rss,
  Gift,
  Wrench,
  BarChart3,
  Cpu,
  ShoppingBag,
  Star,
} from "lucide-react";
import { getKnowledgeBases } from "@/data/contentManager";
import { useNavigate } from "react-router-dom";

const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-3">
    {icon}
    <h2 className="text-base font-semibold text-gray-800">{title}</h2>
  </div>
);

const InfoItem = ({
  icon,
  text,
  iconBgColor,
}: {
  icon: React.ReactNode;
  text: string;
  iconBgColor: string;
}) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50/50 cursor-pointer transition-colors">
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBgColor}`}
    >
      {icon}
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

const ToolItem = ({
  label,
  subLabel,
  bgColor,
  tag,
}: {
  label: string;
  subLabel: string;
  bgColor: string;
  tag?: string;
}) => (
  <div
    className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-sm relative ${bgColor}`}
  >
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold bg-black/5 text-gray-700 px-2 py-0.5 rounded-full">
        {label}
      </span>
      <p className="text-sm font-medium text-gray-800">{subLabel}</p>
    </div>
    {tag && (
      <div className="absolute top-2 right-2 text-xs font-bold text-yellow-600 bg-yellow-400/50 px-1.5 py-0.5 rounded-full">
        {tag}
      </div>
    )}
  </div>
);

export const HomePage = () => {
  // 管理员入口已移至右下角图标，页面不再展示内嵌登录面板
  const navigate = useNavigate();
  const kb = getKnowledgeBases();

  const homeItems = kb
    .filter((item) => item.showOnHome)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleGoToTrending = (id: string) => {
    navigate(`/trending?selected=${encodeURIComponent(id)}`);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Header - 渐变毛玻璃效果 */}
      <header className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-white/40 via-white/60 to-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg relative overflow-hidden">
        {/* 内层渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/20 pointer-events-none"></div>
        <div className="relative z-10 flex justify-between items-center w-full">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-purple-700 text-left">
                Ai4free
              </h1>
              <p className="text-sm text-gray-500 -mt-1">让知识流动起来</p>
            </div>
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded h-fit">
              公益站
            </span>
          </div>
          <div className="w-1/3 relative">
            {/* 管理员入口已移动到右下角图标，不在页面中直接显示登录 */}
          </div>
        </div>
      </header>

      {/* Main Content - 堆叠布局 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
        <div className="flex flex-col gap-6">
          {/* 1) 知识库（通栏） */}
          <Card className="p-6 bg-white/70">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div>
                <SectionHeader
                  icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
                  title="知识库"
                />
                <p className="text-sm text-gray-600 mt-1">
                  系统化的学习资源分类，持续更新
                </p>
              </div>
              <Button className="bg-green-400 hover:bg-green-500 text-white font-bold">
                立即加入
              </Button>
            </div>
          </Card>

          {/* 2) 最新资讯 & 福利羊毛（两列） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-white/70">
              <SectionHeader
                icon={<Rss className="w-5 h-5 text-orange-500" />}
                title="最新资讯"
              />
              <div className="space-y-3">
                {homeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleGoToTrending(item.id)}
                    className="flex items-center gap-3 p-3 cursor-pointer transition-transform hover:scale-[1.01] clay-card home-item-card"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        item.tag === "推荐"
                          ? "tag-icon-recommended"
                          : item.tag === "免费"
                            ? "tag-icon-free"
                            : "tag-icon-hot"
                      }`}
                    >
                      {item.icon ? (
                        <item.icon className="w-4 h-4 text-lavender-500" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span
                            className={`clay-badge ${
                              item.tag === "推荐"
                                ? "tag-badge-recommended"
                                : item.tag === "免费"
                                  ? "tag-badge-free"
                                  : "tag-badge-hot"
                            }`}
                          >
                            {item.tag}
                          </span>
                        )}
                        <span className="text-sm text-gray-800 line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-white/70">
              <SectionHeader
                icon={<Gift className="w-5 h-5 text-pink-500" />}
                title="福利羊毛"
              />
              <div className="space-y-2">
                <InfoItem
                  icon={<Star className="w-4 h-4 text-red-500" />}
                  text="每日签到领取积分奖励"
                  iconBgColor="bg-red-100"
                />
                <InfoItem
                  icon={<ShoppingBag className="w-4 h-4 text-green-500" />}
                  text="限时免费资源大放送"
                  iconBgColor="bg-green-100"
                />
              </div>
            </Card>
          </div>

          {/* 3) AI 最新应用（通栏） */}
          <Card className="p-4 bg-white/70">
            <SectionHeader
              icon={<Cpu className="w-5 h-5 text-purple-500" />}
              title="AI 最新应用"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ToolItem
                label="学术"
                subLabel="学术搜索"
                bgColor="bg-purple-100/50"
              />
              <ToolItem
                label="HF"
                subLabel="HF 镜像"
                bgColor="bg-yellow-100/70"
                tag="HF"
              />
              <ToolItem
                label="VPN"
                subLabel="直连模型"
                bgColor="bg-red-100/50"
              />
              <ToolItem
                label="API"
                subLabel="免费API"
                bgColor="bg-blue-100/50"
              />
            </div>
          </Card>

          {/* 4) 常用模型（通栏） */}
          <Card className="p-4 bg-white/70">
            <SectionHeader
              icon={<Wrench className="w-5 h-5 text-blue-500" />}
              title="常用模型"
            />
            <div className="grid grid-cols-2 gap-6">
              <ToolItem
                label="代码"
                subLabel="代码生成"
                bgColor="bg-blue-100/50"
              />
              <ToolItem
                label="文档"
                subLabel="文档助手"
                bgColor="bg-orange-100/50"
              />
              <ToolItem
                label="图片"
                subLabel="图片处理"
                bgColor="bg-green-100/50"
              />
              <ToolItem
                label="数据"
                subLabel="数据分析"
                bgColor="bg-purple-100/50"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
