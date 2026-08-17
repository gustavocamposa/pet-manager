import express from "express";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/login", authRoutes);
app.use(errorMiddleware);
export { app };
