import { Router } from "express";
import * as authController from "../controllers/controller.auth.js";
import authRequired from "../middlewares/verifyToken.js";

import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";

const router = Router();

router.post('/signin', authController.signin)

router.post("/signup", authRequired, verifyRoleAdmin, authController.signup);
router.get("/signup", authRequired, verifyRoleAdmin, authController.getSignup);
router.get("/verify", authController.verifyToken)
router.post("/logout", authRequired, authController.logout);

export default router;