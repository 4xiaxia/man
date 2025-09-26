import React from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  onSelect: () => void;
  gradient: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  name,
  description,
  url,
  image,
  tags,
  onSelect,
  gradient,
}) => {
  return (
    <Card className="clay-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
          >
            <img
              src={image}
              alt={name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = `<div class="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-white font-bold text-sm">${name.charAt(0)}</div>`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
              {name}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="clay-badge text-xs px-2 py-1 bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button
              onClick={onSelect}
              size="sm"
              className="w-full text-xs h-7 group-hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              打开工具
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
