import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/getProducts", getProducts);
router.get("/getProduct:id", getProduct);
router.post("/createProduct", upload.array('images', 5), createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
