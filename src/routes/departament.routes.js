import { Router } from "express";
import * as departamentController from "../controllers/controller.department.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";

const router = Router();

router.post('/add-department',verifyToken, verifyRoleAdmin, departamentController.newDepartment);
router.get('/departments',verifyToken, verifyRoleAdmin, departamentController.getAllDepartments);

router.get('/department/:id',verifyToken, departamentController.getDepartmentById);

export default router