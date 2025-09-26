import * as React from "react";

interface ActivityCardProps {
  icon: string;
  color: "blue" | "pink" | "green" | "red";
  text: string;
}

export const ActivityCard = ({ icon, color, text }: ActivityCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "border-blue-200/60 bg-blue-50/50 hover:bg-blue-50/80";
      case "pink":
        return "border-pink-200/60 bg-pink-50/50 hover:bg-pink-50/80";
      case "green":
        return "border-green-200/60 bg-green-50/50 hover:bg-green-50/80";
      case "red":
        return "border-red-200/60 bg-red-50/50 hover:bg-red-50/80";
      default:
        return "border-gray-200/60 bg-gray-50/50 hover:bg-gray-50/80";
    }
  };

  const getDotColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "pink":
        return "bg-pink-500";
      case "green":
        return "bg-green-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm cursor-pointer ${getColorClasses()}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <div className={`w-1 h-1 rounded-full ${getDotColor()}`}></div>
      </div>
      <span className="text-sm text-gray-700 font-medium flex-1">{text}</span>
    </div>
  );
};
