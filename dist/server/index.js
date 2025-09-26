import express from "express";
import dotenv from "dotenv";
import { setupStaticServing } from "./static-serve.js";
import { pathToFileURL } from "url";
dotenv.config();
const app = express();
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// example endpoint
// app.get('/api/hello', (req: express.Request, res: express.Response) => {
//   res.json({ message: 'Hello World!' });
// });
// Export a function to start the server
export async function startServer(port) {
    try {
        if (process.env.NODE_ENV === "production") {
            setupStaticServing(app);
        }
        app.listen(port, () => {
            console.log(`API Server running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}
// Start the server directly if this is the main module
const isMain = (() => {
    try {
        return import.meta.url === pathToFileURL(process.argv[1]).href;
    }
    catch {
        return false;
    }
})();
if (isMain) {
    console.log("Starting server...");
    startServer(process.env.PORT || 3001);
}
