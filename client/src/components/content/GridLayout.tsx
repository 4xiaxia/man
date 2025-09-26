import * as React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export const GridLayout = ({ children }: GridLayoutProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 h-full auto-rows-fr">
      {React.Children.map(children, (child, index) => {
        // 为大卡片（如"计算机科学"）设置单列显示
        if (
          React.isValidElement(child) &&
          typeof child.props === "object" &&
          child.props !== null &&
          "className" in child.props &&
          typeof child.props.className === "string" &&
          child.props.className.includes("col-span-3")
        ) {
          return React.cloneElement(child, {
            className: child.props.className + " col-span-4",
          } as any);
        }
        return child;
      })}
    </div>
  );
};
