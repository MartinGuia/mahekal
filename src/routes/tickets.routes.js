import { Router } from "express";
import * as ticketsController from "../controllers/controller.tickets.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRoleAdmin from "../middlewares/verifyRoleAdmin.js";
import verifyRolesAdmins from "../middlewares/verifyRolesAdmins.js";

const router = Router();

// Add new tickets
router.get("/add-ticket", verifyToken, ticketsController.addNewTicketGet);
router.post("/add-ticket", verifyToken,  ticketsController.addNewTicketPost);

// Get tickets
router.get("/tickets", verifyToken, ticketsController.getAllTickets);
router.get("/ticket/:id", verifyToken, ticketsController.getTicketById);

// Tickets filters
router.get("/new-tickets", verifyToken, ticketsController.getAllNewTickets);
router.get("/progress-tickets", verifyToken, ticketsController.getAllTicketsInProgress);
router.get("/resolved", verifyToken, ticketsController.getAllTicketsResolve);
router.get("/pause-or-review", verifyToken, ticketsController.getAllTicketsOnPauseOrReview);



router.get("/tickets-department", verifyToken, verifyRolesAdmins, ticketsController.getAllTicketsByDepartment);

router.put("/reassignTicket/:id", ticketsController.reassignTicket);

export default router 