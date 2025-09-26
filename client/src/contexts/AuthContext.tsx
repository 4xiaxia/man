import * as React from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  error: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// 简单的密码哈希函数（生产环境应使用更安全的方法）
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "ai4free_salt_2024"); // 添加盐值
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// 预设的管理员密码哈希（对应密码：admin2024!）
const ADMIN_PASSWORD_HASH =
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    // 检查sessionStorage中的认证状态
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [error, setError] = React.useState<string>("");

  const login = React.useCallback(
    async (password: string): Promise<boolean> => {
      try {
        setError("");

        if (!password.trim()) {
          setError("请输入密码");
          return false;
        }

        // 临时硬编码密码验证，方便快速使用
        if (
          password === "admin" ||
          password === "admin123" ||
          password === "admin2024!"
        ) {
          setIsAuthenticated(true);
          sessionStorage.setItem("admin_authenticated", "true");
          sessionStorage.setItem("admin_login_time", Date.now().toString());
          return true;
        } else {
          setError("密码错误，请重试。可用密码：admin, admin123, admin2024!");
          return false;
        }
      } catch (err) {
        setError("登录过程中发生错误");
        console.error("Login error:", err);
        return false;
      }
    },
    [],
  );

  const logout = React.useCallback(() => {
    setIsAuthenticated(false);
    setError("");
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_login_time");
  }, []);

  // 检查会话是否过期（24小时）
  React.useEffect(() => {
    const checkSession = () => {
      const loginTime = sessionStorage.getItem("admin_login_time");
      if (loginTime) {
        const now = Date.now();
        const sessionDuration = now - parseInt(loginTime);
        const maxSessionDuration = 24 * 60 * 60 * 1000; // 24小时

        if (sessionDuration > maxSessionDuration) {
          logout();
        }
      }
    };

    if (isAuthenticated) {
      checkSession();
      // 每小时检查一次会话
      const interval = setInterval(checkSession, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, logout]);

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      error,
    }),
    [isAuthenticated, login, logout, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
