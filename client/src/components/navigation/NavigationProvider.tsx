import * as React from "react";

export interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showTools: boolean;
  setShowTools: (show: boolean) => void;
}

const NavigationContext = React.createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = React.useState("home");
  const [showTools, setShowTools] = React.useState(false);

  return (
    <NavigationContext.Provider
      value={{ activeTab, setActiveTab, showTools, setShowTools }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
