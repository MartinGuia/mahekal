import { Router } from "express";
import * as ticketsController from "../controllers/controller.tickets.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";

const router = Router();

router.get('/add-ticket', verifyToken,  ticketsController.addNewTicketGet);
router.post('/add-ticket', verifyToken,  ticketsController.addNewTicketPost);

router.get('/tickets', verifyToken, ticketsController.getAllTickets);
router.get('/active-tickets', verifyToken, ticketsController.getAllActiveTickets);


router.get('/ticket/:id', verifyToken, ticketsController.getTicketById);


router.get('/tickets-department', verifyToken, verifyRolesAdmins, ticketsController.getAllTicketsByDepartment);

router.put('/reassignTicket/:id', ticketsController.reassignTicket);

export default router 