import {Router} from "express";
import AuthToken from "../middlewares/Auth.js";
import { getOrders, listOrders, placeOrder, updateStatus, verifyOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/place-order", AuthToken, placeOrder);
router.post("/verify-order", AuthToken, verifyOrder);
router.get("/myorders", AuthToken, getOrders);
router.get("/list-orders", listOrders);
router.post("/list-orders", listOrders);
router.post("/update-status", updateStatus);

export default router;