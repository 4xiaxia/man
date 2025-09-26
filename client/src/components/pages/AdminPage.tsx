import * as React from "react";
import {
  getKnowledgeBases,
  saveKnowledgeBases,
  KnowledgeBase,
  TagType,
  IframeStrategy,
} from "@/data/contentManager";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export const AdminPage = () => {
  const { isAuthenticated, login, logout, error: authError } = useAuth();
  const [password, setPassword] = React.useState("");
  // NOTE: changed from any[] -> KnowledgeBase[] for stronger typing (2025-09-03)
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>(
    [],
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [activeTab, setActiveTab] = React.useState<string>("content");

  React.useEffect(() => {
    if (isAuthenticated) {
      setKnowledgeBases(getKnowledgeBases());
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      setPassword("");
    }
  };

  const handleInputChange = React.useCallback(
    (
      index: number,
      field: keyof KnowledgeBase,
      value: string | number | boolean | TagType | IframeStrategy,
    ) => {
      setKnowledgeBases((prevBases) =>
        prevBases.map((base, idx) =>
          idx === index ? { ...base, [field]: value } : base,
        ),
      );
    },
    [],
  );

  const handleNumberChange = React.useCallback(
    (index: number, field: "order", value: number) => {
      setKnowledgeBases((prevBases) =>
        prevBases.map((base, idx) =>
          idx === index ? { ...base, [field]: value } : base,
        ),
      );
    },
    [],
  );

  const handleImport = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const result = event.target?.result;
          if (typeof result !== "string")
            throw new Error("Invalid file content");
          const data: KnowledgeBase[] = JSON.parse(result);
          setKnowledgeBases(data);
          alert("导入成功！");
        } catch (error) {
          alert("导入失败：文件格式不正确");
        }
      };
      reader.readAsText(file);
    },
    [setKnowledgeBases],
  );

  const handleExport = React.useCallback(() => {
    try {
      const dataStr = JSON.stringify(knowledgeBases, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = `knowledge_bases_${new Date().toISOString().split("T")[0]}.json`;
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("导出失败，请重试");
    }
  }, [knowledgeBases]);

  const handleSaveChanges = React.useCallback(() => {
    try {
      // Basic validation before saving
      for (let i = 0; i < knowledgeBases.length; i++) {
        const item = knowledgeBases[i];
        // order must be a number
        if (item.order !== undefined && typeof item.order !== "number") {
          alert(`第 ${i + 1} 项的排序（order）必须为数字`);
          return;
        }
        // iframeStrategy must be present
        if (!item.iframeStrategy) {
          alert(`第 ${i + 1} 项必须选择 iframe 展示策略`);
          return;
        }
        // basic url check
        try {
          // will throw if invalid
          // allow relative urls too
          if (typeof item.url !== "string" || item.url.trim() === "") {
            alert(`第 ${i + 1} 项的 URL 不合法`);
            return;
          }
        } catch (e) {
          alert(`第 ${i + 1} 项的 URL 不合法`);
          return;
        }
      }

      // Ensure each item has iframeStrategy (default to 'embed' if missing) and save
      const normalized = knowledgeBases.map((item) => ({
        ...item,
        iframeStrategy: item.iframeStrategy || "embed",
      }));
      saveKnowledgeBases(normalized);
      alert("更改已保存！");
    } catch (error) {
      console.error("Save failed:", error);
      alert("保存失败，请重试");
    }
  }, [knowledgeBases]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">管理员登录</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="client-password">密码</Label>
                <Input
                  id="client-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                />
              </div>
              {authError && <p className="text-sm text-red-500">{authError}</p>}
              <Button type="submit" className="w-full">
                登录
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 分类emoji映射
  const categoryEmojis: Record<string, string> = {
    聊天: "💬",
    图片: "🖼️",
    搜索: "🔍",
    工作流: "🔄",
    工具: "🛠️",
  };

  // 按分类过滤知识库
  const filteredKnowledgeBases = React.useMemo(() => {
    if (activeCategory === "all") return knowledgeBases;
    return knowledgeBases.filter((item) => item.category === activeCategory);
  }, [knowledgeBases, activeCategory]);

  // 获取所有分类
  const categories = React.useMemo(() => {
    const cats = [
      ...new Set(knowledgeBases.map((item) => item.category).filter(Boolean)),
    ] as string[];
    return cats.sort();
  }, [knowledgeBases]);

  // 统计数据
  const stats = React.useMemo(() => {
    const total = knowledgeBases.length;
    const showOnHome = knowledgeBases.filter((item) => item.showOnHome).length;
    const byTag = {
      推荐: knowledgeBases.filter((item) => item.tag === "推荐").length,
      免费: knowledgeBases.filter((item) => item.tag === "免费").length,
      热门: knowledgeBases.filter((item) => item.tag === "热门").length,
    };
    return { total, showOnHome, byTag };
  }, [knowledgeBases]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">管理后台</h1>
            <p className="text-sm text-gray-500 mt-1">知识库内容管理系统</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleExport}>
              📤 导出数据
            </Button>
            <input
              type="file"
              id="kb-import-file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              aria-label="导入JSON数据文件"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("kb-import-file")?.click()}
            >
              📥 导入数据
            </Button>
            <Button size="sm" onClick={handleSaveChanges}>
              💾 保存更改
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              🚪 退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* 左侧边栏 */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* 统计面板 */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              📊 数据统计
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">总数量</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">首页显示</span>
                <span className="font-medium">{stats.showOnHome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">推荐</span>
                <span className="font-medium text-purple-600">
                  {stats.byTag.推荐}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">免费</span>
                <span className="font-medium text-green-600">
                  {stats.byTag.免费}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">热门</span>
                <span className="font-medium text-orange-600">
                  {stats.byTag.热门}
                </span>
              </div>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              🏷️ 分类筛选
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === "all"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                📋 全部 ({knowledgeBases.length})
              </button>
              {categories.map((category) => {
                const count = knowledgeBases.filter(
                  (item) => item.category === category,
                ).length;
                const emoji = categoryEmojis[category] || "📁";
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category || "all")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === category
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {emoji} {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* 功能标签页 */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              ⚙️ 功能
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("content")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === "content"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                📝 内容管理
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === "settings"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                ⚙️ 系统设置
              </button>
            </div>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 overflow-auto">
          {activeTab === "content" ? (
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeCategory === "all"
                    ? "全部内容"
                    : `${activeCategory} 分类`}
                  <span className="ml-2 text-sm text-gray-500">
                    ({filteredKnowledgeBases.length} 项)
                  </span>
                </h2>
              </div>
              <div className="space-y-4">
                {filteredKnowledgeBases.map((item, index) => {
                  const actualIndex = knowledgeBases.findIndex(
                    (kb) => kb.id === item.id,
                  );
                  if (actualIndex === -1) return null; // 安全检查
                  return (
                    <Card
                      key={item.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            {item.tag && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.tag === "推荐"
                                    ? "bg-purple-100 text-purple-700"
                                    : item.tag === "免费"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {item.tag}
                              </span>
                            )}
                            {item.showOnHome && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                首页显示
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`kb-name-${item.id}`}>名称</Label>
                          <Input
                            id={`kb-name-${item.id}`}
                            value={item.name}
                            onChange={(e) =>
                              handleInputChange(
                                actualIndex,
                                "name",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`kb-description-${item.id}`}>
                            描述
                          </Label>
                          <Input
                            id={`kb-description-${item.id}`}
                            value={item.description}
                            onChange={(e) =>
                              handleInputChange(
                                actualIndex,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`kb-url-${item.id}`}>
                            链接 (URL)
                          </Label>
                          <Input
                            id={`kb-url-${item.id}`}
                            value={item.url}
                            onChange={(e) =>
                              handleInputChange(
                                actualIndex,
                                "url",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor={`kb-order-${item.id}`}>
                              排序 (order)
                            </Label>
                            <Input
                              id={`kb-order-${item.id}`}
                              type="number"
                              value={item.order ?? 0}
                              onChange={(e) =>
                                handleNumberChange(
                                  actualIndex,
                                  "order",
                                  Number(e.target.value),
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`kb-tag-${item.id}`}>
                              标签 (可选)
                            </Label>
                            <select
                              id={`kb-tag-${item.id}`}
                              aria-label={`标签 (可选) - ${item.id}`}
                              value={item.tag ?? ""}
                              onChange={(e) =>
                                handleInputChange(
                                  actualIndex,
                                  "tag",
                                  e.target.value || undefined,
                                )
                              }
                              className="w-full"
                            >
                              <option value="">（无）</option>
                              <option value="推荐">推荐</option>
                              <option value="免费">免费</option>
                              <option value="热门">热门</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor={`kb-showOnHome-${item.id}`}>
                              首页展示
                            </Label>
                            <div className="mt-1">
                              <input
                                id={`kb-showOnHome-${item.id}`}
                                aria-label={`首页展示 - ${item.id}`}
                                type="checkbox"
                                checked={!!item.showOnHome}
                                onChange={(e) =>
                                  handleInputChange(
                                    actualIndex,
                                    "showOnHome",
                                    e.target.checked,
                                  )
                                }
                              />{" "}
                              <span className="ml-2">在首页展示</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label htmlFor={`kb-iconName-${item.id}`}>
                              图标 (iconName)
                            </Label>
                            <div className="flex items-center gap-2">
                              <select
                                id={`kb-iconName-${item.id}`}
                                aria-label={`图标选择 - ${item.id}`}
                                value={item.iconName ?? "MessageSquare"}
                                onChange={(e) =>
                                  handleInputChange(
                                    actualIndex,
                                    "iconName",
                                    e.target.value,
                                  )
                                }
                                className="flex-1"
                              >
                                <option value="MessageSquare">
                                  MessageSquare (聊天)
                                </option>
                                <option value="BrainCircuit">
                                  BrainCircuit (AI大脑)
                                </option>
                                <option value="ImageIcon">
                                  ImageIcon (图片)
                                </option>
                                <option value="Search">Search (搜索)</option>
                                <option value="Film">Film (视频/工作流)</option>
                                <option value="FileText">
                                  FileText (文档/工具)
                                </option>
                              </select>
                              {/* 图标预览 */}
                              <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded border">
                                {(() => {
                                  const iconName =
                                    item.iconName ?? "MessageSquare";
                                  const iconMap = {
                                    MessageSquare: "💬",
                                    BrainCircuit: "🧠",
                                    ImageIcon: "🖼️",
                                    Search: "🔍",
                                    Film: "🎬",
                                    FileText: "📄",
                                  };
                                  return (
                                    <span className="text-sm">
                                      {iconMap[
                                        iconName as keyof typeof iconMap
                                      ] || "❓"}
                                    </span>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`kb-iframeStrategy-${item.id}`}>
                              iframe 展示策略
                            </Label>
                            <select
                              id={`kb-iframeStrategy-${item.id}`}
                              aria-label={`iframe 展示策略 - ${item.id}`}
                              value={item.iframeStrategy ?? "embed"}
                              onChange={(e) =>
                                handleInputChange(
                                  actualIndex,
                                  "iframeStrategy",
                                  e.target.value,
                                )
                              }
                              className="w-full"
                            >
                              <option value="embed">嵌入 (embed)</option>
                              <option value="snapshot">
                                弹窗快照+跳转 (snapshot)
                              </option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor={`kb-category-${item.id}`}>
                              分类 (category)
                            </Label>
                            <Input
                              id={`kb-category-${item.id}`}
                              value={item.category ?? ""}
                              onChange={(e) =>
                                handleInputChange(
                                  actualIndex,
                                  "category",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            // 系统设置标签页
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  系统设置
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  管理系统配置和偏好设置
                </p>
              </div>

              <div className="space-y-6">
                {/* 数据管理 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">📊 数据管理</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">
                          数据备份
                        </h4>
                        <p className="text-sm text-blue-700 mb-3">
                          导出当前所有知识库数据
                        </p>
                        <Button
                          size="sm"
                          onClick={handleExport}
                          className="w-full"
                        >
                          📤 导出数据
                        </Button>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">
                          数据恢复
                        </h4>
                        <p className="text-sm text-green-700 mb-3">
                          从备份文件恢复数据
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            document.getElementById("kb-import-file")?.click()
                          }
                        >
                          📥 导入数据
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 系统信息 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">ℹ️ 系统信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">系统版本</span>
                        <p className="font-medium">v1.0.0</p>
                      </div>
                      <div>
                        <span className="text-gray-600">最后更新</span>
                        <p className="font-medium">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">数据存储</span>
                        <p className="font-medium">LocalStorage</p>
                      </div>
                      <div>
                        <span className="text-gray-600">管理员</span>
                        <p className="font-medium">Admin</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 快捷操作 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">⚡ 快捷操作</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-4"
                        onClick={() => {
                          if (
                            confirm("确定要清空所有数据吗？此操作不可恢复！")
                          ) {
                            setKnowledgeBases([]);
                            localStorage.removeItem("ai4free_knowledge_bases");
                          }
                        }}
                      >
                        <div className="text-left">
                          <div className="font-medium text-red-600">
                            🗑️ 清空所有数据
                          </div>
                          <div className="text-sm text-gray-500">
                            删除所有知识库数据（谨慎操作）
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto p-4"
                        onClick={() => {
                          if (confirm("确定要重置为默认数据吗？")) {
                            localStorage.removeItem("ai4free_knowledge_bases");
                            window.location.reload();
                          }
                        }}
                      >
                        <div className="text-left">
                          <div className="font-medium text-blue-600">
                            🔄 重置为默认
                          </div>
                          <div className="text-sm text-gray-500">
                            恢复系统默认的知识库配置
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
