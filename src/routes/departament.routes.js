import { Router } from "express";
import * as departamentController from "../controllers/controller.department.js";
import authRequired from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";
import verifyRoleWithoutOperator from "../middlewares/verifyRoleWithoutOperator.js";


const router = Router();

// Get all tickets
router.get("/alldepartments", authRequired, verifyRoleAdmin, departamentController.getAllDepartments);

// Add new departament
router.post("/add-department", authRequired, verifyRoleAdmin, departamentController.newDepartment);

// Get department by Id
router.get("/tickets-department/:id", authRequired, verifyRolesAdmins, departamentController.getDepartmentTickestById);

// Get Colaborator by id of department
router.get("/colaborators-department/:id", authRequired, verifyRolesAdmins, departamentController.getColaboratorsByDepartment);

// Delete a user and their reference
router.delete("/delete-colaborator/:id", verifyToken, verifyRoleAdmin, departamentController.deleteColaboratorByDepartment);

router.get("/get-users-online",verifyToken, departamentController.getAllUsersOnline);

router.get("/get-users-offline",verifyToken, departamentController.getAllUsersOffline);


export default router