import * as React from "react";
import { NavigationProvider } from "./components/navigation/NavigationProvider";
import { MainContainer } from "./components/layout/MainContainer";
import { AdminPanel } from "./components/admin/AdminPanel";
import IconShowcase from "./components/pages/IconShowcase";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple router
  if (route.startsWith("/admin")) {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <AdminPanel />
        </AuthProvider>
      </ErrorBoundary>
    );
  }

  if (route.startsWith("/icons")) {
    return (
      <ErrorBoundary>
        <IconShowcase />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <NavigationProvider>
        <MainContainer />
      </NavigationProvider>
    </ErrorBoundary>
  );
}

export default App;
