import { Router } from "express";
import { addFood } from "../controllers/foodController";

const router = Router();

router.post("/add", addFood);

export default router;
