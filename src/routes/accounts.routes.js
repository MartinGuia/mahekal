import { Router } from "express";
import * as accountsController from "../controllers/controller.accounts.js";
const router = Router();

router.get("/get-allUsers", accountsController.getAllUsers);
router.get("/getUser/:id", accountsController.getUserById);

export default router 