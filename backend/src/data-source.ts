import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { Image } from "./entities/Image";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // for dev only, use migrations in prod!
  entities: [Product, Image],
});
