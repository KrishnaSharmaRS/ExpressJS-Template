import { Router } from "express";

// ----------------------------- ROUTERS -----------------------------
import usersRouter from "./usersRouter";

// ----------------------------- ROOT ROUTER -----------------------------
const rootRouter = Router();

// ----------------------------- TRIM ALL BODY STRINGS -----------------------------
rootRouter.use((req, _res, next) => {
    for (const key in req.body) if (typeof req.body[key] === "string") req.body[key] = req.body[key].trim();

    next();
})
// ---------------------- ROUTE HANDLERS -----------------------
rootRouter.use("/users", usersRouter);

// -------------------------- INVALID ROUTE HANDLER -----------------------------
rootRouter.use((_req, res) => res.status(400).send({ error: "INVALID REQUEST!!!" }));

export default rootRouter;