import express from "express";
import { CheckCookie } from "../../middleware/Cookiecheck.js";
import {
  CreateProducts,
  DeleteProducts,
  GetProducts,
  UpdateProducts,
  getProductData,
  getRelatedProduct,
  getSearchProduct,
} from "../../controller/productContoller/Product.js";
import { isAdmin } from "../../middleware/adminCheck.js";

export const proute = express.Router();

proute.get("/get-products", GetProducts);
proute.post("/create-products", CheckCookie, isAdmin, CreateProducts);
proute.put("/update-products", CheckCookie, isAdmin, UpdateProducts);
proute.delete("/delete-products", CheckCookie, isAdmin, DeleteProducts);

proute.get("/product/:id", getProductData);
proute.get("/related-product/:id", getRelatedProduct);
proute.get("/search/products", getSearchProduct);
