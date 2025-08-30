import { Router } from "express";
import { loginUser, registerUser, logoutUser, Check } from "../controllers/userController.js";
import AuthToken from "../middlewares/Auth.js";


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", AuthToken, Check);

export default router;