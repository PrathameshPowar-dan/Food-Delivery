import {Router} from "express";
import AuthToken from "../middlewares/Auth.js";
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/place-order", AuthToken, placeOrder);
router.post("/verify-order", AuthToken, verifyOrder);

export default router;