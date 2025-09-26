import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContentCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  // Allow the known layout variants but accept other strings coming from pages
  layout?:
    | "full"
    | "half-left"
    | "half-right"
    | "quarter"
    | "two-thirds"
    | "one-third"
    | string;
  color: string;
  compact?: boolean;
  className?: string;
}

export const ContentCard = ({
  title,
  description,
  layout,
  color,
  compact = false,
  className,
}: ContentCardProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case "full":
        return "col-span-4";
      case "half-left":
      case "half-right":
        return "col-span-2";
      case "quarter":
        return "col-span-1";
      case "two-thirds":
        return "col-span-3";
      case "one-third":
        return "col-span-1";
      default:
        return "col-span-4";
    }
  };

  if (compact) {
    return (
      <div
        className={`group cursor-pointer transition-all duration-200 hover:shadow-md bg-gradient-to-br ${color} border border-gray-200/50 rounded-lg p-4 overflow-hidden h-full flex flex-col justify-center ${className || ""}`}
      >
        <div className="flex flex-col h-full justify-center">
          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight pl-1">
            {title}
          </h3>

          <div className="mt-3 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-blue-500/60 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`${getLayoutClasses()} group cursor-pointer transition-all duration-200 hover:shadow-md bg-gradient-to-br ${color} border-gray-200/50 overflow-hidden h-full flex flex-col ${className || ""}`}
    >
      <CardHeader className="pb-2 px-6 pt-5 flex items-center">
        <CardTitle className="text-sm font-medium text-gray-800 line-clamp-1 pl-1">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 px-6 pb-5 flex-1 flex flex-col justify-center">
        <p className="text-xs text-gray-600 line-clamp-2 pl-1">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="w-8 h-1 bg-blue-500/60 rounded-full" />
          <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            阅读更多
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
