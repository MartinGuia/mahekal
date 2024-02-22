import { Router } from "express";
import * as departamentController from "../controllers/controller.department.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";
import verifyRoleWithoutOperator from "../middlewares/verifyRoleWithoutOperator.js";


const router = Router();

router.post('/add-department', verifyToken,verifyRoleAdmin,departamentController.newDepartment);
router.get('/departments', verifyToken,verifyRoleAdmin,departamentController.getAllDepartments);

router.get('/department/:id', verifyToken,verifyRoleAdmin,departamentController.getDepartmentById);

router.get('/department-area', verifyToken, departamentController.getDepartmentAreaManager);

// router.get('/department/user/:id',verifyToken, departamentController.getDepartmentAreaManager);

export default router