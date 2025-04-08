"use strict";

import {createServer} from "http";
import fs from "fs";
import url from "url";
import querystring from "querystring";
import {extname} from "path";

// MIME types for different file extensions
const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".mjs": "application/javascript",
    ".txt": "text/plain",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".mp3": "audio/mpeg",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
}

const nameVisitors = [];

// function to replace < and > characters with _ to prevent XSS
function sanitizeInput(input) {
    return input.replace(/</g, "_").replace(/>/g, "_");
}

// processing requests
function webserver( request, response ) {

    let url_parse = url.parse(request.url);
    let pathname = url_parse.pathname;
    let query = querystring.parse(url_parse.query);

    console.log("-".repeat(30), "New request", "-".repeat(30));
    console.log("Request URL:", request.url);
    console.log("Pathname:", pathname);
    console.log("Query:", query);

    if (pathname === "/exit") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    } else if (pathname === "/clear") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>The server will clear the visitors list.</body></html>");
        nameVisitors.length = 0;
    } else if (pathname === "/hi" && query.user) {
        const user = decodeURIComponent(query.user);
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.write(`<!doctype html><html><body>hi ${user}!</body></html>`);
        response.end();
    } else if (pathname === "/bonsoir" && query.name) {
        let name = decodeURIComponent(query.name);
        name = sanitizeInput(name);
        let previousVisitors = nameVisitors.join(", ");
        nameVisitors.push(name);
        console.log("New visitor:", name);
        console.log("Previous visitors:", previousVisitors);

        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.write(`<!doctype html><html><body>bonsoir ${name}, the following users have already visited this page: ${previousVisitors}</body></html>`);
        response.end();
    } else if (pathname.startsWith("/files/")) {
        const filePath = pathname.replace("/files/", "");
        console.log("File path:", filePath);

        // Check if the file exists in the server directory
        if (filePath.startsWith("..")) {
            response.writeHead(403, {"Content-Type": "text/html; charset=utf-8"});
            response.end("<!doctype html><html><body>Access denied</body></html>");
            return;
        }

        try {
            const fileContent = fs.readFileSync(filePath);
            const ext = extname(filePath).toLowerCase()
            const mimeType = mimeTypes[ext] || "application/octet-stream";

            response.writeHead(200, {"Content-Type": mimeType});
            response.write(fileContent);
            response.end()
        } catch (error) {
            console.log("File path:", filePath);
            console.error("Error reading file:", error);
            response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
            response.end("<!doctype html><html><body>File not found</body></html>");
        }

    } else {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>Server works!</body></html>");
    }
}

// server object creation
const server = createServer(webserver);

// get the port from the command line arguments
const port = process.argv[2] || 8000;

// server starting
server.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
        return;
    }
    console.log(`Server is listening on port ${port}`);
});
