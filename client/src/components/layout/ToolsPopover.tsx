import * as React from "react";
import { Wrench, Search, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigation } from "../navigation/NavigationProvider";

export const ToolsPopover = () => {
  const { activeTab, setActiveTab } = useNavigation();
  const isActive = activeTab === "tools";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex flex-col items-center gap-1 py-3 px-4 h-auto text-xs transition-all duration-200 ${
            isActive
              ? "bg-accent text-accent-foreground font-medium rounded-md"
              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
          }`}
          onClick={() => setActiveTab("tools")}
        >
          <Wrench className="w-4 h-4" />
          <span>工具</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-2 bg-white/80 backdrop-blur-sm border-white/30 shadow-lg rounded-lg"
        side="top"
        align="center"
      >
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 justify-start h-8 text-sm text-gray-700 hover:bg-accent/50 hover:text-accent-foreground rounded-md"
          >
            <Search className="w-4 h-4" />
            搜飞书
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 justify-start h-8 text-sm text-gray-700 hover:bg-accent/50 hover:text-accent-foreground rounded-md"
          >
            <Cloud className="w-4 h-4" />
            搜云盘
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
