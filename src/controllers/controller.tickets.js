import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";
import Department from "../models/Department.model.js";
import Roles from "../models/Roles.model.js";
import { formatDate } from "../libs/formatDate.js";
import { generateTicketNumber } from "../libs/generateTicketNumber.js";

export const addNewTicketGet = async (req, res) => {
  try {
    const departmentFound = await Department.find();

    let userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(404).json({ message: "User not found" });

    userFound = {
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
    };

    if (departmentFound.length == 0)
      res.status(204).json({ message: "Departments not found" });
    const departments = departmentFound.map((department) => {
      return {
        id: department.id,
        name: department.name,
      };
    });

      // let ticket = await Ticket.findById(req.params.id);
      // if (!ticket) return res.status(404).json({ message: "Not Found" });
  
      // ticket = {
      //   imageURL: ticket.imageURL,
      // };

    

    
    return res.status(200).json({ departments, userFound });
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
      ticketNumber: generateTicketNumber(),
      imageURL: imageURL,
    });

    const departmentUpdated = await Department.findByIdAndUpdate(
      departmentFound._id,
      { $push: { ticketsDepartment: newTicket._id } }
    );

    const savedTicket = await newTicket.save();    
    return res.status(201).json({ message: "Ticket saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    switch (roleFound.name) {
      case "Administrador":
      case "Gerente Administrador":
        const ticketsForAdminsFound = await Ticket.find().lean();

        const ticketsForAdmins = await Promise.all(
          ticketsForAdminsFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            if (ticket.assignedTo.length === 0) {
              ticket.assignedTo = "Sin asignar";
              ticket.ejecutionTime = "Sin asignar";
              delete ticket.dateUpdated;
            } else {
              let lastEjecutionTime = new Date(
                ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
              );
              let lastDateUpdated = new Date(
                ticket.dateUpdated[ticket.dateUpdated.length - 1]
              );

              let differenceInMilliseconds =
                lastEjecutionTime - lastDateUpdated;
              let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
              let differenceHours =
                differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

              ticket.ejecutionTime =
                differenceHours >= 1
                  ? `${differenceHours}H`
                  : `${differenceInMinutes}m`;

              let lastAssigned =
                ticket.assignedTo[ticket.assignedTo.length - 1];
              let colaboratorAssigned = await User.findById(lastAssigned);
              ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
              delete ticket.dateUpdated;
            }
            return ticket;
          })
        );

        return res.status(200).json(ticketsForAdminsFound.reverse());
      case "Gerente Área":
        const departmentFound = await Department.findById(req.user.department);
        const departmentsTickets = departmentFound.ticketsDepartment;

        const ticketsForAreaManager = await Promise.all(
          departmentsTickets.map(async (idTicket) => {
            let ticket = await Ticket.findById(idTicket).lean();
            let ticketDepartment = await Department.findById(
              ticket.assignedDepartment
            );

            ticket.assignedDepartment = ticketDepartment.name;
            ticket.date = formatDate(ticket.date);
            delete ticket.imageURL;

            if (ticket.assignedTo.length === 0) {
              ticket.assignedTo = "Sin asignar";
              ticket.ejecutionTime = "Sin asignar";
              delete ticket.dateUpdated;
            } else {
              let lastEjecutionTime = new Date(
                ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
              );
              let lastDateUpdated = new Date(
                ticket.dateUpdated[ticket.dateUpdated.length - 1]
              );

              let differenceInMilliseconds =
                lastEjecutionTime - lastDateUpdated;
              let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
              let differenceHours =
                differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

              ticket.ejecutionTime =
                differenceHours >= 1
                  ? `${differenceHours}H`
                  : `${differenceInMinutes}m`;

              let lastAssigned =
                ticket.assignedTo[ticket.assignedTo.length - 1];
              let colaboratorAssigned = await User.findById(lastAssigned);
              ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
              delete ticket.dateUpdated;
            }
            return ticket;
          })
        );
        return res.status(200).json(ticketsForAreaManager.reverse());
      case "Operador":
        let operator = await User.findById(req.user.id);
        let tickets = operator.tickets;

        let ticketsForOperador = await Promise.all(
          tickets.map(async (idTicket) => {
            let ticket = await Ticket.findById(idTicket).lean();
            let ticketDepartment = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.assignedDepartment = ticketDepartment.name;
            ticket.assignedTo = operator.name + " " + operator.lastname;
            ticket.date = formatDate(ticket.date);

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime =
              differenceHours >= 1
                ? `${differenceHours}h`
                : `${differenceInMinutes}m`;

            delete ticket.dateUpdated;
            delete ticket.description;
            delete ticket.imageURL;
            return ticket;
          })
        );
    }
    return res.status(200).json(ticketsForOperador);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllNewTickets = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    switch (roleFound.name) {
      case "Administrador":
      case "Gerente Administrador":
        const ticketsForAdminsFound = await Ticket.find({
          status: "Nuevo",
        }).lean();

        const ticketsForAdmins = await Promise.all(
          ticketsForAdminsFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            ticket.assignedTo = "Sin asignar";
            ticket.ejecutionTime = "Sin asignar";
            delete ticket.dateUpdated;

            return ticket;
          })
        );
        return res.status(200).json(ticketsForAdmins.reverse());
      case "Gerente Área":
        const ticketsForAreaManagerFound = await Ticket.find({
          assignedDepartment: req.user.department,
          status: "Nuevo",
        }).lean();

        const ticketsForAreaManager = await Promise.all(
          ticketsForAreaManagerFound.map(async (ticket) => {
            let ticketDepartment = await Department.findById(
              ticket.assignedDepartment
            );

            ticket.assignedDepartment = ticketDepartment.name;
            ticket.date = formatDate(ticket.date);
            delete ticket.imageURL;

            ticket.assignedTo = "Sin asignar";
            ticket.ejecutionTime = "Sin asignar";
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(ticketsForAreaManager.reverse());
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTicketsInProgress = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    switch (roleFound.name) {
      case "Administrador":
      case "Gernte Administrador":
        const ticketsForAdminsFound = await Ticket.find({
          status: "En curso",
        }).lean();

        const ticketsForAdmins = await Promise.all(
          ticketsForAdminsFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            if (ticket.assignedTo.length === 0) {
              ticket.assignedTo = "Sin asignar";
              ticket.ejecutionTime = "Sin asignar";
              delete ticket.dateUpdated;
            } else {
              let lastEjecutionTime = new Date(
                ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
              );
              let lastDateUpdated = new Date(
                ticket.dateUpdated[ticket.dateUpdated.length - 1]
              );

              let differenceInMilliseconds =
                lastEjecutionTime - lastDateUpdated;
              let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
              let differenceHours =
                differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

              ticket.ejecutionTime =
                differenceHours >= 1
                  ? `${differenceHours}H`
                  : `${differenceInMinutes}m`;

              let lastAssigned =
                ticket.assignedTo[ticket.assignedTo.length - 1];
              let colaboratorAssigned = await User.findById(lastAssigned);
              ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
              delete ticket.dateUpdated;
            }
            return ticket;
          })
        );

        return res.status(200).json(ticketsForAdmins);
      case "Gerente Área":
        const ticketsForAreaManagerFound = await Ticket.find({
          assignedDepartment: req.user.department,
          status: "En curso",
        }).lean();

        const ticketsForAreaManager = await Promise.all(
          ticketsForAreaManagerFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime =
              differenceHours >= 1
                ? `${differenceHours}H`
                : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(ticketsForAreaManager.reverse());
      case "Operador":
        const userFound = await User.findById(req.user.id);
        const assignedTickets = userFound.tickets;

        const operatorTickers = await Promise.all(
          assignedTickets.map(async (idTicket) => {
            let ticket = await Ticket.findById(idTicket).lean();
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime =
              differenceHours >= 1
                ? `${differenceHours}H`
                : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(operatorTickers.reverse());
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTicketsResolve = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    switch (roleFound.name) {
      case "Administrador":
      case "Gerente Administrador":
        const ticketsForAdminsFound = await Ticket.find({
          status: "Resuelto",
        }).lean();

        const ticketsForAdmins = await Promise.all(
          ticketsForAdminsFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            if (ticket.assignedTo.length === 0) {
              ticket.assignedTo = "Sin asignar";
              ticket.ejecutionTime = "Sin asignar";
              delete ticket.dateUpdated;
            } else {
              let lastEjecutionTime = new Date(
                ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
              );
              let lastDateUpdated = new Date(
                ticket.dateUpdated[ticket.dateUpdated.length - 1]
              );

              let differenceInMilliseconds =
                lastEjecutionTime - lastDateUpdated;
              let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
              let differenceHours =
                differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

              ticket.ejecutionTime =
                differenceHours >= 1
                  ? `${differenceHours}H`
                  : `${differenceInMinutes}m`;

              let lastAssigned =
                ticket.assignedTo[ticket.assignedTo.length - 1];
              let colaboratorAssigned = await User.findById(lastAssigned);
              ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
              delete ticket.dateUpdated;
            }

            return ticket;
          })
        );

        return res.status(200).json(ticketsForAdmins.reverse());
      case "Gerente Área":
        const ticketsForAreaManagerFound = await Ticket.find({
          assignedDepartment: req.user.department,
          status: "Resuelto",
        }).lean();

        const tickerForAreaManager = await Promise.all(
          ticketsForAreaManagerFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime =
              differenceHours >= 1
                ? `${differenceHours}H`
                : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(tickerForAreaManager);
      case "Operador":
        const userFound = await User.findById(req.user.id);
        const assignedTickets = userFound.tickets;

        const operatorTickets = await Promise.all(
          assignedTickets.map(async (idTicket) => {
            let ticket = await Ticket.findById(idTicket).lean();
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;
            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime =
              differenceHours >= 1
                ? `${differenceHours}H`
                : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(operatorTickets);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTicketsOnPauseOrReview = async (req, res) => {
  try {
    const roleFound = await Roles.findById(req.user.role);

    switch (roleFound.name) {
      case "Administrador":
      case "Gerente Administrador":
        const ticketsForAdminsFound = await Ticket.find({
          status: "En pausa/revisión",
        }).lean();

        const ticketsForAdmins = await Promise.all(
          ticketsForAdminsFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            // ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime = "En pausa/revision";
            // differenceHours >= 1
            //   ? `${differenceHours}H`
            //   : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(ticketsForAdmins);
      case "Gerente Área":
        const ticketsForAreaManagerFound = await Ticket.find({
          status: "En pausa/revisión",
          assignedDepartment: req.user.department,
        }).lean();

        const ticketsForAreaManager = await Promise.all(
          ticketsForAreaManagerFound.map(async (ticket) => {
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;

            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime = "En pausa/revision";

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(ticketsForAreaManager);
      case "Operador":
        const userFound = await User.findById(req.user.id);
        const assignedTickets = userFound.tickets;

        const operatorTickets = await Promise.all(
          assignedTickets.map(async (idTicket) => {
            let ticket = await Ticket.findById(idTicket).lean();
            let departmentFound = await Department.findById(
              ticket.assignedDepartment
            );
            ticket.id = ticket._id;
            delete ticket._id;
            ticket.date = formatDate(ticket.date);
            ticket.assignedDepartment = departmentFound.name;
            delete ticket.imageURL;
            let lastEjecutionTime = new Date(
              ticket.ejecutionTime[ticket.ejecutionTime.length - 1]
            );
            let lastDateUpdated = new Date(
              ticket.dateUpdated[ticket.dateUpdated.length - 1]
            );

            let differenceInMilliseconds = lastEjecutionTime - lastDateUpdated;
            let differenceInMinutes = differenceInMilliseconds / (60 * 1000);
            let differenceHours =
              differenceInMinutes >= 60 ? differenceInMinutes / 60 : 0;

            ticket.ejecutionTime = "En pausa/revision";
            // differenceHours >= 1
            //   ? `${differenceHours}H`
            //   : `${differenceInMinutes}m`;

            let lastAssigned = ticket.assignedTo[ticket.assignedTo.length - 1];
            let colaboratorAssigned = await User.findById(lastAssigned);
            ticket.assignedTo = `${colaboratorAssigned.name} ${colaboratorAssigned.lastname}`;
            delete ticket.dateUpdated;

            return ticket;
          })
        );

        return res.status(200).json(operatorTickets);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
      imageURL: ticket.imageURL,
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

    if(status === "En pausa/revision") {
      const ticketUpdate = await Ticket.findByIdAndUpdate(ticketToUpdate, {
        status: status,
        $push: { ejecutionTime: 0, dateUpdated: Date.now() }
      })
      
      return res.status(200).json({ message: "Ticket reassigned successfully" });
    }

    if (ticketToUpdate.assignedTo.length == 0) {
      const colaboratorUpdated = await User.findByIdAndUpdate(assignedTo, {
        $push: { tickets: ticketToUpdate._id },
      });

      if (!colaboratorUpdated)
        return res.status(404).json({ message: "User to reassing not found" });

      const ejecutionDate = Date.now() + ejecutionTime * 60 * 1000;

      const ticketUpdate = await Ticket.findByIdAndUpdate(ticketToUpdate.id, {
        $push: {
          assignedTo: assignedTo,
          ejecutionTime: ejecutionDate,
          dateUpdated: Date.now(),
        },
        status: status,
        priority: priority,
      });

      res.status(200).json({ message: "Ticket reassigned successfully" });
    } else {
      const user =
        ticketToUpdate.assignedTo[ticketToUpdate.assignedTo.length - 1];      

        if (user == assignedTo) {
          const ejecutionDate = Date.now() + ejecutionTime * 60 * 1000;

          const ticketUpdate = await Ticket.findByIdAndUpdate(ticketToUpdate.id, {
            $push: {
              assignedTo: assignedTo,
              ejecutionTime: ejecutionDate,
              dateUpdated: Date.now(),
            },
            status: status,
            priority: priority,
          });

          return res
            .status(200)
            .json({ message: "Ticket reassigned successfully" });
        } else {
          const colaboratorUpdated = await User.findByIdAndUpdate(assignedTo, {
            $push: { tickets: ticketToUpdate._id },
          });

          if (!colaboratorUpdated)
            return res
              .status(404)
              .json({ message: "User to reassing not found" });

          const ejecutionDate = Date.now() + ejecutionTime * 60 * 1000;

          const ticketUpdate = await Ticket.findByIdAndUpdate(ticketToUpdate.id, {
            $push: {
              assignedTo: assignedTo,
              ejecutionTime: ejecutionDate,
              dateUpdated: Date.now(),
            },
            status: status,
            priority: priority,
          });

          const ticketFound = await Ticket.findById(req.params.id);
          const removedUser =
            ticketFound.assignedTo[ticketFound.assignedTo.length - 2];

          const removedTicket = await User.findByIdAndUpdate(removedUser, {
            $pull: { tickets: ticketFound._id },
          });
        }

      return res
        .status(200)
        .json({ message: "Ticket reassigned successfully" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
