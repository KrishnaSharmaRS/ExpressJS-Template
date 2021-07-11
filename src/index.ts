import path from "path";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

// --------------ROUTER & DATABASE CONFIGS--------------
import rootRouter from "./routers";
import sequelize from "./database/sequelize";

// ------------VARIABLES------------
const server = express();
const PORT = process.env['NODE_ENV'] || 5000;
const publicDir = path.join(__dirname, "./public/application");

// --------------NOT TO SEND THIS RESPONSE HEADER---------------
server.disable("x-powered-by");

// ------------MIDDLEWARES------------
server.use(compression());
server.use(express.static(publicDir));
server.use(express.json());
server.use(cookieParser());
server.use(rootRouter);

// ------------CONNECT TO DATABASE AND LISTEN ON PORT------------
sequelize.sync().then(() => console.log("Database Connection Successful."))
    .catch((error) => console.error("Database Connection Failed!", error))
    .finally(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    });