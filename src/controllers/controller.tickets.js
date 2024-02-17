import dayjs from "dayjs";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Department from "../models/Departament.model.js";
import Roles from "../models/Roles.model.js";

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
    const departmentFound = await Department.findById(assignedDepartment);
    if (!departmentFound)
      return res.status(404).json({ message: "Departament not found" });

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

    const departmentUpdated = await Department.findByIdAndUpdate(
      departmentFound._id,
      { $push: { ticketsDepartment: newTicket._id } }
    );

    const ticketSaved = await newTicket.save();
    res.status(201).json({ message: "Ticket saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    if (roleFound.name === "Administrador") {
      try {
        const ticketsArray = [];
        const ticketsFound = await Ticket.find();

        if (ticketsFound.length === 0)
          return res.status(204).json({ message: "Tickets not found" });

        for (let ticket of ticketsFound) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: ticket.date,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };

          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    if (roleFound.name === "Gerente Administrador") {
      try {
        const ticketsArray = [];
        const ticketsFound = await Ticket.find();

        if (ticketsFound.length === 0)
          return res.status(204).json({ message: "Tickets not found" });

        for (let ticket of ticketsFound) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: ticket.date,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    if (roleFound.name === "Gerente Área") {
      try {
        const departmentFound = await Department.findById(req.user.department);
        const ticketsDepartment = departmentFound.ticketsDepartment;
        const ticketsArray = [];

        if (ticketsDepartment.length === 0)
          return res.status(204).json({ message: "Tickets not found" });

        for (let ticket of ticketsDepartment) {
          let ticketFound = await Ticket.findById(ticket);
          const departmentFound = await Department.findById(
            ticketFound.assignedDepartment
          );
          ticketFound = {
            id: ticketFound.id,
            name: ticketFound.name,
            date: ticketFound.date,
            title: ticketFound.title,
            priority: ticketFound.priority,
            status: ticketFound.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticketFound.assignedTo,
          };
          ticketsArray.push(ticketFound);
        }
        return res.status(200).json(ticketsArray);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    if (roleFound.name === "Operador") {
      res.status(200).json({ message: "SI" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  };
};

export const getAllActiveTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    if (roleFound.name === "Administrador") {
      try {
        const activeTickets = await Ticket.find({ status: "Activo" });
        const ticketsArray = [];

        for (let ticket of activeTickets) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: ticket.date,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    };

    if (roleFound.name === "Gerente Administrador") {
      try {
        const activeTickets = await Ticket.find({ status: "Activo" });
        const ticketsArray = [];

        for (let ticket of activeTickets) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: ticket.date,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    };

    if (roleFound.name === "Gerente Área") {
      const ticketsArray = [];
      const ticketsFound = await Ticket.find({
        assignedDepartment: req.user.department,
        status: "Activo",
      });

      for (let ticket of ticketsFound) {
        const departmentFound = await Department.findById(
          ticket.assignedDepartment
        );
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: ticket.date,
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          assignedDepartment: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      }

      return res.status(200).json(ticketsArray);
    };

    if (roleFound.name === "Operador") {
    };
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  const departmentFound = await Departament.findById(req.user.department);
  const ticketsDepartment = departmentFound.ticketsDepartment;

  const tickets = [];

  for (const ticket of ticketsDepartment) {
    const ticketFound = await Ticket.findById(ticket);
    tickets.push(ticketFound);
  }

  return res.status(200).json(tickets);
};
