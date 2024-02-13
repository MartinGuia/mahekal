import { Router } from "express";
import * as ticketsController from "../controllers/controller.tickets.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";

const router = Router();

router.get('/tickets', verifyRoleAdmin, verifyToken, ticketsController.getAllTickets);
router.get('/ticket/:id', ticketsController.getTicketById);

router.post('/add-ticket', verifyToken,  ticketsController.addNewTicketPost);
router.get('/add-ticket', verifyToken,  ticketsController.addNewTicketGet);

router.get('/tickets-department', verifyToken, verifyRolesAdmins, ticketsController.getAllTicketsByDepartment);

router.put('/reassignTicket/:id', ticketsController.reassignTicket);

export default router 