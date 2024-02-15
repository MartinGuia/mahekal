import dayjs from "dayjs";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Department from "../models/Departament.model.js";
import Roles from "../models/Roles.model.js";

export const getAllTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    if (roleFound.name === "Administrador") {
      const ticketsArray = [];
      const tickets = await Ticket.find();
      for (let ticket of tickets) {
        const departmentFound = await Department.findById(ticket.assignedDepartment);
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: ticket.date,
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          department: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      };
      return res.status(200).json(ticketsArray);
    };

    if (roleFound.name === "Gerente Administrador") {
      const ticketsArray = [];
      const tickets = await Ticket.find();
      for (let ticket of tickets) {
        const departmentFound = await Department.findById(ticket.assignedDepartment);
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: ticket.date,
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          department: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      };
      return res.status(200).json(ticketsArray);
    };

    if (roleFound.name === "Gerente Área") {
      const ticketsArray = []
      const departmentFound = await Department.findById(req.user.department);
      const ticketsDepartment = departmentFound.ticketsDepartment;
      for (let ticket of ticketsDepartment) {
        const ticketFound = await Ticket.findById(ticket)
        const departmentFound = await Department.findById(ticketFound.assignedDepartment);
        ticket = {
          id: ticketFound.id,
          name: ticketFound.name,
          title: ticketFound.title,
          priority: ticketFound.priority,
          status: ticketFound.status,
          department: departmentFound.name,
          assignedTo: ticketFound.assignedTo
        }
        ticketsArray.push(ticket);
      }
      res.status(200).json(ticketsArray)
    };

    if (roleFound.name === "Operador") {
      res.status(200).json({message: 'SI'});
    };
  } catch (error) {
    return res.status(400).json({message: error.message});
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
    if (!departmentFound) return res.status(404).json({ message: "Departament not found" });

    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    const newTicket = new Ticket({
      name: userFound.name + " " + userFound.lastname,
      date: localDate,
      title: title,
      priority: priority,
      status: "Activo",
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