import Department from "../models/Departament.model.js";
import User from "../models/User.model.js";
import Ticket from "../models/Ticket.model.js";

// Create a new Departament function
export const newDepartment = async (req, res) => {
  // Body desctructuring
  const { name } = req.body;

  try {
    // Find department by name
    const departmentFound = await Department.findOne({ name });

    // If department has already been registered, return status and response
    if (departmentFound)
      return res
        .status(400)
        .json({ message: "Department registered previously" });

    // Create a new department instance
    const newDepartment = new Department({
      name: name,
    });

    // Save department and return status and response
    const savedDepartment = newDepartment.save();
    res.status(201).json({ message: "Department created successfully" });
  } catch (error) {
    // Return status and response if there is an error
    res.status(500).json({ message: error.message });
  }
};

export const getAllDepartments = async (req, res) => {
  // Find all department, if not found return status and message
  const departmentsFound = await Department.find();
  if (departmentsFound.length === 0)
    return res
      .status(204)
      .json({ message: "There are no departments available." });

  // Make new object with department information
  const listDepartments = departmentsFound.map((departments) => {
    return {
      id: departments.id,
      name: departments.name,
      colaborators: departments.colaborators.length,
      tickets: departments.ticketsDepartment.length,
    };
  });
  // Returns status and list with news obbjects
  return res.status(200).json(listDepartments);
};

export const getDepartmentById = async (req, res) => {
  try {
    const departmentFound = await Department.findById(req.params.id);
    const colaboratorsDepartment = departmentFound.colaborators;

    const colaborators = [];

    for (const colaborator of colaboratorsDepartment) {
      let user = await User.findById(colaborator);
      user = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
      };
      colaborators.push(user);
    }
    return res.status(200).json(colaborators);
  } catch (error) {
    return res.status(400).json({ message: "Department not found" });
  }
};

export const getDepartmentAreaManager = async (req, res) => {
  const departmentFound = await Department.findById(req.user.department);
  const colaborators = departmentFound.colaborators;
  const tickets = departmentFound.ticketsDepartment;

  const colaboratorsArray = [];
  const ticketsArray = [];
  const pendientes = [];
  const activos = [];
  const caducados = [];

  for (const colaborator of colaborators) {
    let userFound = await User.findById(colaborator);
    userFound = {
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
    };
    colaboratorsArray.push(userFound);
  }

  for (const ticket of tickets) {
    let ticketFound = await Ticket.findById(ticket);

    if (ticketFound.status === "Pendiente") {
      ticketFound = {
        id: ticketFound.id,
        name: ticketFound.name,
        date: ticketFound.date,
        title: ticketFound.title,
        priority: ticketFound.priority,
        status: ticketFound.status,
        assignedDepartment: ticketFound.assignedDepartment,
        assignedTo: ticketFound.assignedTo,
      };
      pendientes.push(ticketFound);
    }

    if (ticketFound.status === "Activo") {
      ticketFound = {
        id: ticketFound.id,
        name: ticketFound.name,
        date: ticketFound.date,
        title: ticketFound.title,
        priority: ticketFound.priority,
        status: ticketFound.status,
        assignedDepartment: ticketFound.assignedDepartment,
        assignedTo: ticketFound.assignedTo,
      };
      activos.push(ticketFound);
    }

    if (ticketFound.status === "Caducado") {
      ticketFound = {
        id: ticketFound.id,
        name: ticketFound.name,
        date: ticketFound.date,
        title: ticketFound.title,
        priority: ticketFound.priority,
        status: ticketFound.status,
        assignedDepartment: ticketFound.assignedDepartment,
        assignedTo: ticketFound.assignedTo,
      };
      caducados.push(ticketFound);
    }

    ticketFound = {
      id: ticketFound.id,
      name: ticketFound.name,
      date: ticketFound.date,
      title: ticketFound.title,
      priority: ticketFound.priority,
      status: ticketFound.status,
      assignedDepartment: ticketFound.assignedDepartment,
      assignedTo: ticketFound.assignedTo,
    };
    ticketsArray.push(ticketFound);
  }

  res.status(200).json({ 
    colaborators: colaboratorsArray,
    tickets: ticketsArray,
    pendientes: pendientes,
    activos: activos,
    caducados: caducados
  });
};