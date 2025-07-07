import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Image } from "../entities/Image";

const productRepo = AppDataSource.getRepository(Product);
const imageRepo = AppDataSource.getRepository(Image);

export const getProducts = async (_: Request, res: Response) => {
  const products = await productRepo.find();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await productRepo.findOne({
    where: { id: Number(req.params.id) },
  });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { sku, name, price } = req.body;
  const files = req.files as Express.Multer.File[];

  const product = productRepo.create({ sku, name, price });
  await productRepo.save(product);

  if (files) {
    const images = files.map(file => {
      return imageRepo.create({ url: `/uploads/${file.filename}`, product });
    });
    await imageRepo.save(images);
  }

  res.json({ message: "Product created" });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { sku, name, price } = req.body;

  const product = await productRepo.findOneBy({ id });
  if (!product) return res.status(404).json({ message: "Not found" });

  product.sku = sku;
  product.name = name;
  product.price = price;
  await productRepo.save(product);

  res.json({ message: "Product updated" });
};

export const deleteProduct = async (req: Request, res: Response) => {
  await productRepo.delete(req.params.id);
  res.json({ message: "Product deleted" });
};
