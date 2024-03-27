import express from "express";

import {createCategory, deleteCategory, updateCategory, getCategories, getCategoryById} from "../controller/category-cotroller.js";

const router = express.Router();

router.post("/", createCategory);

router.delete("/", deleteCategory);

router.get("/all/", getCategories);

router.get("/:id", getCategoryById);

router.patch("/", updateCategory);

export default router;