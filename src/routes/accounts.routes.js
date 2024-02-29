import { Router } from "express";
import * as accountsController from "../controllers/controller.accounts.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = Router();

router.get("/get-allUsers", accountsController.getAllUsers);
router.get("/getUserToModify/:id", accountsController.getUserByIdToModify);
router.get("/getUser/:id", accountsController.getUserById);
router.put("/update-user", accountsController.updateUser);
router.put("/update-password", accountsController.updatePassword);

export default router;