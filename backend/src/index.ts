import express from "express";
import "reflect-metadata";
import cors from "cors";
import * as dotenv from "dotenv";

import { AppDataSource } from "./data-source";
import productRoutes from "./routes/product.route";
import path from "path";

dotenv.config();
console.log('Connecting with user:', process.env.DB_USERNAME, 'and password:', process.env.DB_PASSWORD);

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use("/api/products", productRoutes);

  const port = process.env.PORT || 3002;
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
