import { Router } from "express";
import { addFood } from "../controllers/foodController.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/add",upload.single("image"), addFood);


export default router;
