import { Router } from "express";
import * as departamentController from "../controllers/controller.department.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";
import verifyRoleWithoutOperator from "../middlewares/verifyRoleWithoutOperator.js";

const router = Router();



// Delete a user and their reference
router.delete("/delete-colaborator/:id", verifyToken, verifyRoleAdmin, departamentController.deleteColaboratorByDepartment)


export default router;