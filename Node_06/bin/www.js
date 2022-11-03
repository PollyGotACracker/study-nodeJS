import http from "http";
import app from "./app.js";

const server = http.createServer(app);

const config = {
  host: "localhost",
  port: 3000,
};

server.listen(config);
