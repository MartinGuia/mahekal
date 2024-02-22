import { Router } from "express";
import * as authController from "../controllers/controller.auth.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";

const router = Router();

router.post("/signin", authController.signin);

router.post("/signup",  authController.signup);
router.get("/signup", verifyToken, verifyRoleAdmin, authController.getSignup);
router.get("/verify", verifyToken)
router.post("/logout", verifyToken, authController.logout);

export default router;

