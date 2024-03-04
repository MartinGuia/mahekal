import dayjs from "dayjs";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Department from "../models/Departament.model.js";
import Roles from "../models/Roles.model.js";

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

    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

    const newTicket = new Ticket({
      name: userFound.name + " " + userFound.lastname,
      // date: localDate,
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
        const newTickets = await Ticket.find({ status: "Nuevo" });
        const ticketsArray = [];

        for (let ticket of newTickets) {
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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
        date: ticket.date,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticket.assignedTo
      }
      ticketsArray.push(ticket);
    }

    return res.status(200).json(ticketsArray);
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

  if (roleFound.name === "Operador") {};
  } catch (error) {
    return res.status(500).json({ message: error.message });
  };
};

export const getTicketById = async (req, res) => {
  try {
    const ticketById = await Ticket.findById(req.params.id);

    const departmentFound = await Department.findById(
      ticketById.assignedDepartment
    );
    const colaborators = departmentFound.colaborators;
    const onlineColaborators = [];

    for (const id of colaborators) {
      console.log(id);
      let colaboratorFound = await User.findById(id);
      console.log(colaboratorFound)
      if (colaboratorFound.islogged === true) {
        colaboratorFound = {
          id: id,
          name: colaboratorFound.name + " " + colaboratorFound.lastname,
        };
        onlineColaborators.push(colaboratorFound);
      }
    }

    return res.status(200).json({ ticketById, onlineColaborators });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const reassignTicketPut = async (req, res) => {
  // const { assignedTo, ejecutionTime } = req.body;

  const now = Date.now();
  const date = Date(now);
  console.log(date)

  let si = [5]
  // si.

  try {    
    const ticket = await Ticket.findById(req.params.id);
    // console.log(ticket);
    const endData = ticket.date[0]
    // console.log(endData);

    // const ticketFound = await Ticket.findByIdAndUpdate(req.params.id, {
    //   assignedTo: assignedTo,
    //   ejecutionTime: ejecutionTime,
    // });
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // const assignedToUpdate = await Ticket.findByIdAndUpdate(
  //   req.params.id,
  //   { $push: req.body },
  //   { new: true }
  // );
  // res.status(200).json(assignedToUpdate);
};

export const getAllTicketsByDepartment = async (req, res) => {
  const departmentFound = await Department.findById(req.user.department);
  const ticketsDepartment = departmentFound.ticketsDepartment;

  const tickets = [];

  for (const ticket of ticketsDepartment) {
    const ticketFound = await Ticket.findById(ticket);
    tickets.push(ticketFound);
  }

  return res.status(200).json(tickets);
};
