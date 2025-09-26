import path from "path";
import express from "express";

// 可配置的静态资源根目录，部署时可覆盖
const STATIC_ROOT =
  process.env.STATIC_ROOT || path.join(process.cwd(), "dist", "public");

/**
 * Sets up static file serving for the Express app
 * @param app Express application instance
 */
export function setupStaticServing(app: express.Application) {
  // Serve static files from the configured static root directory
  app.use(express.static(STATIC_ROOT));

  // SPA fallback: 使用通配路由并显式排除API路由
  app.get("*", (req, res, next) => {
    // 显式旁路API路由
    if (req.path.startsWith("/api/")) {
      return next();
    }

    // 服务index.html文件
    res.sendFile(path.join(STATIC_ROOT, "index.html"));
  });
}
