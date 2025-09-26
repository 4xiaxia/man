import * as React from "react";
import { getKnowledgeBases, KnowledgeBase } from "@/data/contentManager";
import { ChevronRight, Flame, Shuffle } from "lucide-react";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 工具卡片的渐变色映射已移除，使用统一样式

export const TrendingPage: React.FC = () => {
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>(
    [],
  );
  const [selectedTool, setSelectedTool] = React.useState<KnowledgeBase | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isFading, setIsFading] = React.useState<boolean>(false);
  const [openSwitcher, setOpenSwitcher] = React.useState<boolean>(false);
  const [preloadedTools, setPreloadedTools] = React.useState<Set<string>>(
    new Set(),
  );

  React.useEffect(() => {
    const data = getKnowledgeBases();
    setKnowledgeBases(data);
    // 支持 URL 查询参数预选工具
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("selected");
    if (selected) {
      const found = data.find((d) => d.id === selected);
      if (found) {
        setSelectedTool(found);
        // 开始预加载其他工具
        setTimeout(() => preloadOtherTools(data, found.id), 2000);
        return;
      }
    }
    if (data.length > 0) {
      setSelectedTool(data[0]);
      // 开始预加载其他工具
      setTimeout(() => preloadOtherTools(data, data[0].id), 2000);
    }
  }, []);

  // 预加载其他工具的iframe
  const preloadOtherTools = (tools: KnowledgeBase[], currentToolId: string) => {
    const otherTools = tools.filter(
      (tool) =>
        tool.id !== currentToolId &&
        tool.iframeStrategy === "embed" &&
        !preloadedTools.has(tool.id),
    );

    otherTools.forEach((tool, index) => {
      // 延迟预加载，避免同时加载太多iframe影响性能
      setTimeout(() => {
        const iframe = document.createElement("iframe");
        iframe.src = tool.url;
        iframe.style.display = "none";
        iframe.style.position = "absolute";
        iframe.style.left = "-9999px";
        iframe.sandbox.add(
          "allow-scripts",
          "allow-same-origin",
          "allow-forms",
          "allow-popups",
        );

        iframe.onload = () => {
          setPreloadedTools((prev) => new Set([...prev, tool.id]));
          // 预加载完成后隐藏iframe而不是移除
          if (iframe.parentNode) {
            iframe.style.display = "none";
          }
        };

        document.body.appendChild(iframe);
      }, index * 3000); // 每3秒预加载一个
    });
  };

  const handleSelectTool = (tool: KnowledgeBase) => {
    if (!selectedTool || tool.id !== selectedTool.id) {
      setIsFading(true);
      setTimeout(() => {
        setSelectedTool(tool);
        setIsLoading(true);
        setIsFading(false);
      }, 300);
    }
  };

  const handleIframeLoad = () => {
    // 如果工具已经预加载过，减少加载时间
    const loadTime =
      selectedTool && preloadedTools.has(selectedTool.id) ? 500 : 1500;
    setTimeout(() => {
      setIsLoading(false);
    }, loadTime);
  };

  // Handle loading states after all hooks
  if (!knowledgeBases.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>暂无可用工具</p>
      </div>
    );
  }

  if (!selectedTool) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>正在加载工具...</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-full">
        {/* 右侧边缘浮标按钮 - 统一样式 */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 group">
          <button
            onClick={() => setOpenSwitcher(true)}
            className="relative overflow-hidden flex justify-center items-center w-14 h-14 bg-white text-gray-600 transition-all duration-300 ease-in-out hover:text-white shadow-lg hover:shadow-xl"
            style={{
              borderRadius: "50%",
              marginRight: "0px",
              boxShadow: "3px 2px 45px 0px rgba(0, 0, 0, 0.12)"
            }}
            title="切换对话工具"
          >
            <Shuffle className="w-6 h-6 relative z-10" />
            
            {/* 填充动画效果 */}
            <div 
              className="absolute bottom-0 left-0 w-full h-0 bg-primary transition-all duration-300 ease-in-out group-hover:h-full"
              style={{ borderRadius: "50%" }}
            />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
              {selectedTool.name}
              {/* 箭头 */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-primary"></div>
            </div>
          </button>
        </div>

        {/* 中小屏幕布局 */}
        <div className="xl:hidden flex flex-col gap-3 h-full relative">
          {/* 顶部提示条 */}
          <div className="bg-white/70 rounded-md border border-gray-200/60 p-3">
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-800 truncate">
                自由对话
              </h3>
              <p className="text-xs text-gray-600 line-clamp-1">
                当前：{selectedTool.name}
              </p>
            </div>
          </div>

          {/* 中小屏幕对话内容区域 */}
          <div className="flex-1 bg-gray-100/50 rounded-lg border border-gray-200/60 overflow-hidden relative">
            {(isLoading || isFading) && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                  <p className="mt-3 text-sm text-gray-600">
                    正在加载 {selectedTool.name}...
                  </p>
                </div>
              </div>
            )}
            {selectedTool.iframeStrategy === "embed" ? (
              <div className="w-full h-full overflow-hidden rounded-[26px] shadow-clay">
                <iframe
                  key={selectedTool.id}
                  src={selectedTool.url}
                  title={selectedTool.name}
                  className={`w-full h-full border-0 transition-opacity duration-300 scrollbar-none ${isLoading || isFading ? "opacity-0" : "opacity-100"}`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={handleIframeLoad}
                />
              </div>
            ) : (
              <SnapshotGuideCard tool={selectedTool} />
            )}
          </div>
        </div>

        {/* PC端超大屏布局 */}
        <div className="hidden xl:flex gap-3 h-full">
          {/* 左侧边栏 */}
          <div className="w-1/5 flex flex-col gap-3">
            <div className="mb-2">
              <h2 className="text-lg font-medium text-gray-800">自由对话</h2>
              <p className="text-gray-600 text-xs">选择您需要的工具</p>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide px-2">
              {knowledgeBases.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className={clsx(
                      "relative p-4 cursor-pointer rounded-[14px] bg-white/95 transition-transform min-w-0",
                      selectedTool.id === tool.id
                        ? "shadow-lg scale-[1.02]"
                        : "shadow-sm hover:shadow-md hover:scale-[1.02]",
                    )}
                    style={{ minWidth: 0 }}
                  >
                    {tool.tag && (
                      <div className="absolute top-2 right-2">
                        <span
                          className={clsx(
                            "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm",
                            tool.tag === "推荐"
                              ? "bg-[#F4E9FB] text-[#9D8DF1]"
                              : tool.tag === "免费"
                                ? "bg-[#E8F7EF] text-[#65C18C]"
                                : "bg-[#FFF7E6] text-[#E9A13C]",
                          )}
                        >
                          {tool.tag === "热门" ? (
                            <Flame className="w-3 h-3 text-[#E9A13C]" />
                          ) : null}
                          <span>{tool.tag}</span>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col h-full min-w-0">
                      <div className="flex items-center gap-3 min-w-0">
                        {Icon ? (
                          <Icon className="w-6 h-6 text-[#9D8DF1] flex-shrink-0" />
                        ) : null}
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {tool.name}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          点击查看
                        </div>
                        <div
                          className={`flex items-center ${selectedTool.id === tool.id ? "text-[#9D8DF1]" : "text-gray-400"} transition-colors duration-200`}
                        >
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="w-4/5 flex flex-col">
            <div className="text-center mb-1">
              <h1 className="text-sm font-semibold text-gray-600"> </h1>
            </div>
            <div className="flex-1 bg-gray-100/50 rounded-lg border border-gray-200/60 overflow-hidden relative">
              {(isLoading || isFading) && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                    <p className="mt-3 text-sm text-gray-600">
                      正在加载 {selectedTool.name}...
                    </p>
                  </div>
                </div>
              )}
              {selectedTool.iframeStrategy === "embed" ? (
                <div className="w-full h-full overflow-hidden rounded-[26px] shadow-clay">
                  <iframe
                    key={selectedTool.id}
                    src={selectedTool.url}
                    title={selectedTool.name}
                    className={`w-full h-full border-0 transition-opacity duration-300 scrollbar-none ${isLoading || isFading ? "opacity-0" : "opacity-100"}`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onLoad={handleIframeLoad}
                  />
                </div>
              ) : (
                <SnapshotGuideCard tool={selectedTool} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 切换弹窗 */}
      <Dialog open={openSwitcher} onOpenChange={setOpenSwitcher}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>切换对话工具</DialogTitle>
            <DialogDescription>选择您需要的对话工具进行切换</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {knowledgeBases.map((tool) => {
              const Icon = tool.icon;
              const active = selectedTool?.id === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    handleSelectTool(tool);
                    setOpenSwitcher(false);
                  }}
                  className={clsx(
                    "text-left relative p-4 rounded-[14px] bg-white/95 transition-transform min-width-zero border",
                    active
                      ? "shadow-lg scale-[1.01] border-primary/40"
                      : "shadow-sm hover:shadow-md hover:scale-[1.01] border-gray-200/70",
                  )}
                >
                  {tool.tag && (
                    <div className="absolute top-2 right-2">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm",
                          tool.tag === "推荐"
                            ? "bg-[#F4E9FB] text-[#9D8DF1]"
                            : tool.tag === "免费"
                              ? "bg-[#E8F7EF] text-[#65C18C]"
                              : "bg-[#FFF7E6] text-[#E9A13C]",
                        )}
                      >
                        {tool.tag === "热门" ? (
                          <Flame className="w-3 h-3 text-[#E9A13C]" />
                        ) : null}
                        <span>{tool.tag}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 min-w-0">
                    {Icon ? (
                      <Icon className="w-6 h-6 text-[#9D8DF1] flex-shrink-0" />
                    ) : null}
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 truncate">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrendingPage;

// Snapshot 指引卡片（保持不变）
const SnapshotGuideCard: React.FC<{ tool: KnowledgeBase }> = ({ tool }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
          <p className="text-sm text-gray-600">{tool.description}</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            此工具暂不支持嵌入显示，请点击下方按钮在新窗口中打开
          </p>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => window.open(tool.url, "_blank")}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
            >
              在新窗口打开
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? "已复制" : "复制链接"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};