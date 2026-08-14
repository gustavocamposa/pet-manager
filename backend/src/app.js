import express from "express";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/login", authRoutes);
export { app };
