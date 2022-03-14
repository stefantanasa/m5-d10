import express from "express";
import listEndpoints from "express-list-endpoints";
import mediaRouters from "./services/media/index.js";
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./services/middlewares/errorHandlers.js";
import cors from "cors";
const server = express();
server.use(express.json());
server.use(cors());
server.use("/media", mediaRouters);
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

const port = process.env.port;
console.table(listEndpoints(server));
server.listen(port, () => {
  console.log("Serrver is running on port: ", port);
});
