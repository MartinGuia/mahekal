import { Router } from "express";
import * as accountsController from "../controllers/controller.accounts.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = Router();

router.get("/get-allUsers", accountsController.getAllUsers);
router.get("/getUserToModify/:id", accountsController.getUserByIdToModify);

// Ruta para traer los tickets
router.get("/getUser/:id", accountsController.getUserById);
router.put("/update-user/:id", accountsController.updateUser);
router.put("/update-password/:id", accountsController.updatePassword);

router.delete("/deleteUser/:id", accountsController.deleteUser);

export default router;