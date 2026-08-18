import express from "express";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/login", authRoutes);
app.use(errorMiddleware);
export { app };
