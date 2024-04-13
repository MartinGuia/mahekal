import { Router } from "express";
import * as rolesController from "../controllers/controller.role.js";
import authRequired from "../middlewares/verifyToken.js";

const router = Router();

router.get("/get-roles", authRequired, rolesController.getRoles);

export default router