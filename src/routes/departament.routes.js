import { Router } from "express";
import * as departamentController from "../controllers/controller.department.js";

const router = Router();

router.post('/add-department', departamentController.newDepartment);

export default router