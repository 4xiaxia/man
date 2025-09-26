import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Edit, Trash2 } from "lucide-react";
import { getKnowledgeBases, saveKnowledgeBases, KnowledgeBase } from "@/data/contentManager";

interface KnowledgeCardProps {
  item: KnowledgeBase;
  size: "small" | "medium" | "large";
  onEdit: (item: KnowledgeBase) => void;
  onDelete: (id: string) => void;
  onView: (item: KnowledgeBase) => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ item, size, onEdit, onDelete, onView }) => {
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2"
  };

  const cardColors = [
    "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
    "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
    "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
  ];

  const colorIndex = item.order ? (item.order - 1) % cardColors.length : 0;
  const cardColor = cardColors[colorIndex];

  const summary = item.description ? 
    (item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description) : 
    "";

  return (
    <Card 
      className={`${sizeClasses[size]} ${cardColor} p-4 cursor-pointer hover:shadow-lg transition-all duration-300 relative group`}
      onClick={() => onView(item)}
    >
      {/* 管理按钮 */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 hover:bg-white/50"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 hover:bg-red-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <Trash2 className="h-3 w-3 text-red-500" />
        </Button>
      </div>

      {/* 标签 */}
      {item.tag && (
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 text-xs"
        >
          {item.tag}
        </Badge>
      )}

      {/* 图标 */}
      <div className="flex items-center justify-center mb-3 mt-6">
        {item.icon && (
          <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
            <item.icon className="w-6 h-6 text-gray-700" />
          </div>
        )}
      </div>

      {/* 标题 */}
      <h3 className="font-semibold text-gray-800 text-center mb-2 line-clamp-2">
        {item.name}
      </h3>

      {/* 摘要 */}
      {summary && (
        <p className="text-sm text-gray-600 text-center line-clamp-3">
          {summary}
        </p>
      )}

      {/* 分类 */}
      {item.category && (
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
      )}
    </Card>
  );
};

interface KnowledgeDetailModalProps {
  item: KnowledgeBase | null;
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeDetailModal: React.FC<KnowledgeDetailModalProps> = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              {item.icon && <item.icon className="w-6 h-6" />}
              {item.name}
              {item.tag && (
                <Badge variant="secondary" className="ml-2">
                  {item.tag}
                </Badge>
              )}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {item.description && (
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          )}
        </DialogHeader>
        
        <div className="flex-1 px-6 pb-6">
          <ScrollArea className="h-full w-full rounded-md border">
            <iframe
              src={item.url}
              className="w-full h-full min-h-[600px]"
              frameBorder="0"
              title={item.name}
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const KnowledgeBasePage: React.FC = () => {
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<KnowledgeBase | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

  React.useEffect(() => {
    const data = getKnowledgeBases();
    setKnowledgeBases(data);
  }, []);

  const handleEdit = (item: KnowledgeBase) => {
    // TODO: 实现编辑功能
    console.log("Edit item:", item);
  };

  const handleDelete = (id: string) => {
    const updatedData = knowledgeBases.filter(item => item.id !== id);
    setKnowledgeBases(updatedData);
    saveKnowledgeBases(updatedData);
  };

  const handleView = (item: KnowledgeBase) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleAdd = () => {
    // TODO: 实现添加功能
    console.log("Add new item");
  };

  // 根据顺序确定卡片大小
  const getCardSize = (order: number): "small" | "medium" | "large" => {
    const sizePattern = [1, 3, 5, 7, 9]; // PC端加长的序号
    if (sizePattern.includes(order)) {
      return "large";
    } else if (order % 3 === 0) {
      return "medium";
    }
    return "small";
  };

  return (
    <div className="h-full flex flex-col">
      {/* 页面头部 */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-white/40 via-white/60 to-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">知识库</h1>
          <p className="text-sm text-gray-600 mt-1">卡片式知识库管理</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          添加知识库
        </Button>
      </div>

      {/* 卡片网格 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-[200px]">
          {knowledgeBases.map((item) => (
            <KnowledgeCard
              key={item.id}
              item={item}
              size={getCardSize(item.order || 1)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      </div>

      {/* 详情弹窗 */}
      <KnowledgeDetailModal
        item={selectedItem}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
};
