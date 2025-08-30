import { Router } from "express";
import { AddCart, GetCart, RemoveCart } from "../controllers/cartController.js";
import AuthToken from "../middlewares/Auth.js";

const router = Router();

router.post("/add",AuthToken, AddCart);
router.get("/get",AuthToken, GetCart);
router.post("/remove",AuthToken, RemoveCart);

export default router;

