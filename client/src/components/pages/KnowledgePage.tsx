import React, { useState, useCallback } from "react";
import { GridLayout } from "../content/GridLayout";
import { ContentCard } from "../content/ContentCard";

// Lightweight debounce to avoid adding lodash dependency
const debounce = <T extends (...args: any[]) => void>(fn: T, wait = 300) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};

const KNOWLEDGE_ITEMS = [
  {
    title: "计算机科学",
    description: "编程、算法、数据结构",
    layout: "two-thirds",
    color: "from-blue-50/80 to-indigo-100/50",
  },
  {
    title: "快速入门",
    description: "新手指南",
    layout: "one-third",
    color: "from-green-50/80 to-teal-100/50",
  },
  {
    title: "数学与统计",
    description: "高等数学、统计学",
    layout: "half-left",
    color: "from-purple-50/80 to-pink-100/50",
  },
  {
    title: "物理学",
    description: "理论物理、实验",
    layout: "half-right",
    color: "from-orange-50/80 to-red-100/50",
  },
  {
    title: "化学",
    description: "有机化学基础",
    layout: "quarter",
    color: "from-teal-50/80 to-cyan-100/50",
  },
  {
    title: "生物学",
    description: "分子生物学",
    layout: "quarter",
    color: "from-green-50/80 to-lime-100/50",
  },
  {
    title: "经济学",
    description: "宏观微观经济",
    layout: "quarter",
    color: "from-yellow-50/80 to-orange-100/50",
  },
  {
    title: "心理学",
    description: "认知心理学",
    layout: "quarter",
    color: "from-pink-50/80 to-rose-100/50",
  },
];

const INPUT_CLASS_NAME = "p-1 border rounded";

export const KnowledgePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(KNOWLEDGE_ITEMS);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!password.trim()) {
        alert("请输入密码");
        return;
      }
      try {
        const response = await fetch("/api/verify-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: encodeURIComponent(password) }),
        });
        const data = await response.json();
        if (data.success) {
          setIsEditing(true);
        } else {
          alert("密码错误");
        }
      } catch (error) {
        alert("验证失败，请重试");
      }
    },
    [password],
  );

  const debouncedUpdateItem = useCallback(
    (
      index: number,
      updater: (
        item: (typeof KNOWLEDGE_ITEMS)[number],
      ) => (typeof KNOWLEDGE_ITEMS)[number],
    ) => {
      setItems((prevItems: typeof KNOWLEDGE_ITEMS) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = updater(updatedItems[index]);
        return updatedItems;
      });
    },
    [],
  );

  const handleTitleChange = useCallback(
    (index: number, newTitle: string) =>
      debouncedUpdateItem(index, (item) => ({ ...item, title: newTitle })),
    [debouncedUpdateItem],
  );

  const handleDescriptionChange = useCallback(
    (index: number, newDescription: string) =>
      debouncedUpdateItem(index, (item) => ({
        ...item,
        description: newDescription,
      })),
    [debouncedUpdateItem],
  );

  const renderTitle = (isEditing: boolean, title: string, index: number) => {
    if (isEditing) {
      return (
        <div>
          <label htmlFor={`title-${index}`}>标题</label>
          <input
            id={`title-${index}`}
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            className={INPUT_CLASS_NAME}
            placeholder="输入标题"
          />
        </div>
      );
    }
    return title;
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-2 text-left">
          知识库
        </h1>
        <p className="text-gray-600 text-sm text-left">系统化的学习资源分类</p>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="mb-4 p-2 bg-red-500 text-white rounded"
          >
            退出编辑
          </button>
        )}
      </div>

      {/* 桌面端：保持原有网格布局 */}
      <div className="hidden md:block">
        <GridLayout>
          {items.map(
            (item: (typeof KNOWLEDGE_ITEMS)[number], index: number) => (
              <ContentCard
                key={index}
                title={renderTitle(isEditing, item.title, index)}
                description={
                  isEditing ? (
                    <div>
                      <div>
                        <label htmlFor={`description-${index}`}>描述</label>
                        <input
                          id={`description-${index}`}
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            handleDescriptionChange(index, e.target.value)
                          }
                          className={INPUT_CLASS_NAME}
                          placeholder="输入描述"
                        />
                      </div>
                    </div>
                  ) : (
                    item.description
                  )
                }
                layout={item.layout}
                color={item.color}
                className="text-left"
              />
            ),
          )}
        </GridLayout>
      </div>

      {/* 移动端：等宽 2 列瀑布流（columns-2），卡片避免跨列折断，摘要两行截断 */}
      <div className="md:hidden columns-2 gap-3 [column-fill:_balance]">
        {items.map((item: (typeof KNOWLEDGE_ITEMS)[number], index: number) => (
          <ContentCard
            key={`m-${index}`}
            title={renderTitle(isEditing, item.title, index)}
            description={
              isEditing ? (
                <div>
                  <div>
                    <label htmlFor={`description-${index}`}>描述</label>
                    <input
                      id={`description-${index}`}
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      className={INPUT_CLASS_NAME}
                      placeholder="输入描述"
                    />
                  </div>
                </div>
              ) : (
                item.description
              )
            }
            color={item.color}
            className="text-left break-inside-avoid mb-3 w-full"
          />
        ))}
      </div>
    </div>
  );
};
