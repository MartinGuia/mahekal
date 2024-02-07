import Ticket from "../models/Ticket.model.js";

export const getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};

export const addNewTicket = async (req, res) => {
  const {
    name,
    date,
    title,
    priority,
    status,
    assignedDepartment,
    assignedTo,
    ejecutionTime,
    roomOrArea,
    description,
    imageURL,
  } = req.body;

  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  const newTicket = new Ticket({
    name: name,
    date: localDate,
    title: title,
    priority: priority,
    status: status,
    assignedDepartment: assignedDepartment,
    assignedTo: assignedTo,
    ejecutionTime: ejecutionTime,
    roomOrArea: roomOrArea,
    description: description,
    imageURL: imageURL,
  });

  const ticketSaved = await newTicket.save();
  res.status(201).json(ticketSaved);
};

export const getTicketById = async (req,res) => {
  try {
    const ticketById = await Ticket.findById(req.params.id);
    res.status(200).json(ticketById);
  } catch (error) {
    console.log(error);
    res.status(404).json({message: "Ticket not found"});
  }
}

export const reassignTicket = async (req,res) => {
  const assignedToUpdate = await Ticket.findByIdAndUpdate(req.params.id, {$push: req.body },{new: true})
  res.status(200).json(assignedToUpdate)
}