import { Router } from "express";
import * as ticketsController from "../controllers/controller.tickets.js";
import authRequired from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";

const router = Router();

// Add new tickets
router.get('/add-ticket', authRequired,  ticketsController.addNewTicketGet);
router.post('/add-ticket', authRequired,  ticketsController.addNewTicketPost);

// Get tickets
router.get('/tickets', authRequired, ticketsController.getAllTickets);
router.get('/ticket/:id', authRequired, ticketsController.getTicketById);

// Tickets filters
router.get('/new-tickets', authRequired, ticketsController.getAllNewTickets);
router.get('/progress-tickets', authRequired, ticketsController.getAllTicketsInProgress);
router.get('/resolved', authRequired, ticketsController.getAllTicketsResolve);
router.get('/pause-or-review', authRequired, ticketsController.getAllTicketsOnPauseOrReview);

router.put("/reassignTicket/:id", authRequired, ticketsController.reassignTicketPut);

export default router 