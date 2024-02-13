import dayjs from "dayjs";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Departament from "../models/Departament.model.js";

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    return res.json(tickets);
  } catch (error) {
    return res.status(204).json({ message: "Couldn't find tickets" });
  }
};

export const addNewTicketPost = async (req, res) => {
  const {
    title,
    priority,
    assignedDepartment,
    roomOrArea,
    description,
    imageURL,
  } = req.body;

  try {
    const userFound = await User.findById(req.user.id);
    const departmentFound = await Departament.findById(assignedDepartment);

    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    const newTicket = new Ticket({
      name: userFound.name + " " + userFound.lastname,
      date: localDate,
      title: title,
      priority: priority,
      status: "Pendiente",
      assignedDepartment: departmentFound._id,
      roomOrArea: roomOrArea,
      description: description,
      imageURL: imageURL,
    });

    const departmentUpdated = await Departament.findByIdAndUpdate(
      departmentFound._id,
      { $push: { ticketsDepartment: newTicket._id } }
    );

    const ticketSaved = await newTicket.save();
    res.status(201).json({ message: "Ticket saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addNewTicketGet = async (req, res) => {
  try {
    const departmentFound = await Departament.find();

    const departments = departmentFound.map((department) => {
      return {
        id: department.id,
        name: department.name,
      };
    });
    console.log(departments);
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticketById = await Ticket.findById(req.params.id);
    return res.status(200).json(ticketById);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Ticket not found" });
  }
};

export const reassignTicket = async (req, res) => {
  const assignedToUpdate = await Ticket.findByIdAndUpdate(
    req.params.id,
    { $push: req.body },
    { new: true }
  );
  res.status(200).json(assignedToUpdate);
};


export const getAllTicketsByDepartment = async (req, res) => {

  const departmentFound = await Departament.findById(req.user.department)
  const ticketsDepartment = departmentFound.ticketsDepartment;
  
  const tickets = []; 

  for (const ticket of ticketsDepartment) {
    const ticketFound = await Ticket.findById(ticket);
    tickets.push(ticketFound);
  }

  return res.status(200).json(tickets);
};