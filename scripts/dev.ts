import { startServer } from "../server/index.js";
import { createServer, ViteDevServer } from "vite";

let viteServer: ViteDevServer | undefined;

async function startDev() {
  // Start the Express API server first
  let port = 3001;
  let serverStarted = false;
  while (!serverStarted) {
    try {
      await startServer(port);
      serverStarted = true;
      console.log(`API Server running on port ${port}`);
    } catch (err) {
      console.log(`Port ${port} is in use, trying another one...`);
      port++;
    }
  }

  // Then start Vite in dev mode
  const viteServer = await createServer({
    configFile: "./vite.config.js",
  });

  const x = await viteServer.listen();
  console.log(
    `Vite dev server running on port ${viteServer.config.server.port}`,
  );
}

// Handle nodemon restarts - only needed if we're running under nodemon
if (
  process.env.npm_lifecycle_event &&
  process.env.npm_lifecycle_event.includes("watch")
) {
  let isRestarting = false;

  process.once("SIGUSR2", async () => {
    if (isRestarting) return;
    isRestarting = true;

    console.log("Nodemon restart detected, closing Vite server...");
    if (viteServer) {
      try {
        await viteServer.close();
        console.log("Vite server closed successfully");
      } catch (err) {
        console.error("Error closing Vite server:", err);
      }
    }

    // Allow nodemon to restart the process
    process.kill(process.pid, "SIGUSR2");
  });
}

startDev();
