import { Router } from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/add",upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

export default router;
