import Ticket from "../models/Ticket.model.js";
export async function checkTicketExpired() {
  const tickets = await Ticket.find({
    ejecutionTime: { $ne: [] },
    status: { $ne: "Caducado" },
  });

  const now = Date.now();

  tickets.forEach((ticket) => {
    const lastDateUpdated = ticket.dateUpdated[ticket.dateUpdated.length - 1];
    const lastEjecutionTime =
      ticket.ejecutionTime[ticket.dateUpdated.length - 1];

    if (lastDateUpdated != 0 && lastEjecutionTime < now) {
      ticket.status = "Caducado";
      ticket.save();
    }
  });
}

// setInterval(checkTicketExpired, 1 * 60 * 1000);
