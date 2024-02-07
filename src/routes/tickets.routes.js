import { Router } from "express";
import * as ticketsController from "../controllers/controller.tickets.js";
const router = Router();

router.get('/tickets', ticketsController.getTickets);
router.get('/ticket/:id', ticketsController.getTicketById);
router.post('/add-ticket', ticketsController.addNewTicket);

router.put('/reassignTicket/:id', ticketsController.reassignTicket);

export default router 