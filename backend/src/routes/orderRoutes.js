import {Router} from "express";
import AuthToken from "../middlewares/Auth.js";
import { placeOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/place-order", AuthToken, placeOrder);



export default router;