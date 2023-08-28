import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import ConnectDb from "./model/database.js";
import routes from "./routes/userRoutes/userRoute.js";
import { croute } from "./routes/product/categoryRoute.js";
import { proute } from "./routes/product/productRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use("/api/v1", routes);
app.use("/api/v1", croute);
app.use("/api/v1", proute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  ConnectDb();
  console.log("Server is running...");
});
