import { Router } from "express";
import * as departamentController from "../controllers/controller.departament.js";
const router = Router();

router.get('/departaments', departamentController.departaments)

export default router