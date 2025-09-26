import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface IFrameModalProps {
  url: string;
  onClose: () => void;
  isLoading: boolean;
}

const IFrameModal: React.FC<IFrameModalProps> = ({
  url,
  onClose,
  isLoading,
}) => {
  const openInNewTab = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* 头部控制栏 */}
        <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-lg">
          <div className="flex-1 mr-4">
            <Input type="text" readOnly value={url} className="text-sm" />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={openInNewTab}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              新标签页打开
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* iframe 容器 */}
        <div className="flex-1 p-4 bg-gray-50 rounded-b-lg relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-b-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <div className="text-sm text-gray-600">加载中...</div>
              </div>
            </div>
          )}
          <div className="w-full h-full clay-iframe-container">
            <iframe
              src={url}
              title="工具预览"
              className="clay-iframe w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameModal;
