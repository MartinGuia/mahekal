import dayjs from "dayjs";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Department from "../models/Departament.model.js";
import Roles from "../models/Roles.model.js";
import { formatDate } from "../libs/formatDate.js";

export const addNewTicketGet = async (req, res) => {
  try {
    const departmentFound = await Department.find();
    
    let userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(404).json({ message: "User not found" });
    
    userFound = {
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname
    };

    if (departmentFound.length == 0) res.status(204).json({message: "Departments not found" });
    const departments = departmentFound.map((department) => {
      return {
        id: department.id,
        name: department.name,
      };
    });
    return res.status(200).json({departments, userFound});
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

    let dateInMiliseconds = Date.now();

    const newTicket = new Ticket({
      name: userFound.name + " " + userFound.lastname,
      date: dateInMiliseconds,
      title: title,
      priority: priority,
      status: "Nuevo",
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
    return res.status(201).json({ message: "Ticket saved successfully" });
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
            date: formatDate(ticket.date),
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };

          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray.reverse());
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
            date: formatDate(ticket.date),
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray.reverse());
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
            date: formatDate(ticket.date),
            title: ticketFound.title,
            priority: ticketFound.priority,
            status: ticketFound.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticketFound.assignedTo,
          };
          ticketsArray.push(ticketFound);
        }
        return res.status(200).json(ticketsArray.reserve());
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

export const getAllNewTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    if (roleFound.name === "Administrador") {
      try {
        const newTickets = await Ticket.find({ status: "Nuevo" });
        const ticketsArray = [];

        for (let ticket of newTickets) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: formatDate(ticket.date),
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray.reverse());
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    };

    if (roleFound.name === "Gerente Administrador") {
      try {
        const newTickets = await Ticket.find({ status: "Nuevo" });
        const ticketsArray = [];

        for (let ticket of newTickets) {
          const departmentFound = await Department.findById(
            ticket.assignedDepartment
          );
          ticket = {
            id: ticket.id,
            name: ticket.name,
            date: formatDate(ticket.date),
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            assignedDepartment: departmentFound.name,
            assignedTo: ticket.assignedTo,
            roomOrArea: ticket.roomOrArea,
          };
          ticketsArray.push(ticket);
        }
        return res.status(200).json(ticketsArray.reverse());
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    };

    if (roleFound.name === "Gerente Área") {
      const ticketsArray = [];
      const newTickets = await Ticket.find({
        assignedDepartment: req.user.department,
        status: "Nuevo",
      });

      for (let ticket of newTickets) {
        const departmentFound = await Department.findById(
          ticket.assignedDepartment
        );
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: formatDate(ticket.date),
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          assignedDepartment: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      }

      return res.status(200).json(ticketsArray.reverse());
    };

    if (roleFound.name === "Operador") {
    };
  }
   catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTicketsInProgress = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

  if (roleFound.name === "Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "En curso" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "En curso" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Área") {
    const ticketsArray = [];
      const newTickets = await Ticket.find({
        assignedDepartment: req.user.department,
        status: "En curso",
      });

      for (let ticket of newTickets) {
        const departmentFound = await Department.findById(
          ticket.assignedDepartment
        );
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: formatDate(ticket.date),
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          assignedDepartment: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      }

      return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Operador") {};
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const getAllTicketsResolve = async (req,res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

  if (roleFound.name === "Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "Resuelto" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "Resuelto" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Área") {
    const ticketsArray = [];
      const newTickets = await Ticket.find({
        assignedDepartment: req.user.department,
        status: "Resuelto",
      });

      for (let ticket of newTickets) {
        const departmentFound = await Department.findById(
          ticket.assignedDepartment
        );
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: formatDate(ticket.date),
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          assignedDepartment: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      }

      return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Operador") {};
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const getAllTicketsOnPauseOrReview = async (req,res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

  if (roleFound.name === "Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "En pausa/revisión" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Administrador") {
    const ticketsArray = [];
    const ticketsFound = await Ticket.find({ status: "En pausa/revisión" })
    if (ticketsFound.length === 0) return res.status(204).json({ message: "No tickets found"});

    for (let ticket of ticketsFound) {
      const departmentFound = await Department.findById(ticket.assignedDepartment);
      ticket = {
        id: ticket.id,
        name: ticket.name,
        date: formatDate(ticket.date),
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Gerente Área") {
    const ticketsArray = [];
      const newTickets = await Ticket.find({
        assignedDepartment: req.user.department,
        status: "En pausa/revisión",
      });

      for (let ticket of newTickets) {
        const departmentFound = await Department.findById(
          ticket.assignedDepartment
        );
        ticket = {
          id: ticket.id,
          name: ticket.name,
          date: formatDate(ticket.date),
          title: ticket.title,
          priority: ticket.priority,
          status: ticket.status,
          assignedDepartment: departmentFound.name,
          assignedTo: ticket.assignedTo,
        };
        ticketsArray.push(ticket);
      }

      return res.status(200).json(ticketsArray.reverse());
  };

  if (roleFound.name === "Operador") {};
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const getTicketById = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Not Found" });

    const departmentFound = await Department.findById(
      ticket.assignedDepartment
    );

    ticket = {
      id: ticket.id,
      name: ticket.name,
      date: formatDate(ticket.date),
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
      assignedDepartment: departmentFound.name,
      assignedTo: [],
      roomOrArea: ticket.roomOrArea,
      description: ticket.description,
      imageURL: ticket.imageURL
    };

    const colaborators = departmentFound.colaborators;
    const onlineColaborators = [];

    for (const id of colaborators) {
      let colaboratorFound = await User.findById(id);
      if (colaboratorFound.islogged === true) {
        colaboratorFound = {
          id: id,
          name: colaboratorFound.name + " " + colaboratorFound.lastname,
        };
        onlineColaborators.push(colaboratorFound);
      }
    }

    return res.status(200).json({ ticket, onlineColaborators });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const reassignTicketPut = async (req, res) => {
  // prioridad, estado, asignar a , tiempo de ejecución
  const { priority, status, assignedTo, ejecutionTime } = req.body;
  try {
    const ticketToUpdate = await Ticket.findById(req.params.id);

    if (ticketToUpdate === null)
      return res.status(404).json({ message: "Ticket not found" });

    const colaboratorUpdated = await User.findByIdAndUpdate(assignedTo, {
      $push: { tickets: ticketToUpdate._id },
    });

    if (!colaboratorUpdated)
      return res.status(404).json({ message: "User to reassing not found" });

    const ejecutionDate = Date.now() + ejecutionTime * 60 * 1000;

    const ticketUpdate = await Ticket.findByIdAndUpdate(
      ticketToUpdate.id,
      {
        $push: {
          assignedTo: assignedTo,
          ejecutionTime: ejecutionDate,
          dateUpdated: Date.now(),
        },
        status: status, priority: priority
      },
    );

    res.status(200).json({ message: "Ticket reassigned successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
