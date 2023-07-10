import express from "express";

import {
  CreateCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
} from "../../controller/productContoller/Category.js";

import { CheckCookie } from "../../middleware/Cookiecheck.js";

export const croute = express.Router();

croute.get("/get/category", GetCategory);
croute.post("/create/category", CreateCategory);
croute.put("/update/category", CheckCookie, UpdateCategory);
croute.delete("/delete/category", CheckCookie, DeleteCategory);
