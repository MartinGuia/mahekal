import { Router } from "express";
import * as userController from "../controllers/controller.user.js";
const router = Router();

router.get('/user', userController.getUser)

export default router 