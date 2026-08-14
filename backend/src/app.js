import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
export { app };
