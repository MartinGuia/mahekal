import Department from "../models/Departament.model.js";
import User from "../models/User.model.js";
import Ticket from "../models/Ticket.model.js";
import Role from "../models/Roles.model.js";
import { formatDate } from "../libs/formatDate.js";

// Get all departments function
export const getAllDepartments = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

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

// Get all tickets department
export const getDepartmentTickestById = async (req, res) => {
  try {
    const departmentFound = await Department.findById(req.params.id);
    const departmentTickets = departmentFound.ticketsDepartment;
    const ticketsArray = [];

    for (const ticket of departmentTickets) {
      let ticketFound = await Ticket.findById(ticket);
      const departmentFound = await Department.findById(ticketFound.assignedDepartment);
      ticketFound = {
        id: ticketFound.id,
        name: ticketFound.name,
        date: ticketFound.date,
        title: ticketFound.title,
        priority: ticketFound.priority,
        status: ticketFound.status,
        assignedDepartment: departmentFound.name,
        assignedTo: ticketFound.assignedTo,
        roomOrArea: ticketFound.roomOrArea
      };
      ticketsArray.push(ticketFound);
    };

    return res.status(200).json(ticketsArray);
  } catch (error) {
    return res.status(404).json({message: "Department not found"});
  }
};

// Get all colaborators of a department
export const getColaboratorsByDepartment = async (req, res) => {
  try {
    const departmentFound = await Department.findById(req.params.id);
    const departmentColaborators = departmentFound.colaborators;
    const onlineColaborators = [];
    const offlineColaborators = [];

    for (const id of departmentColaborators) {
      let colaborator = await User.findById(id);
      colaborator = {
        id: id,
        name: colaborator.name + " " + colaborator.lastname,
        islogged: colaborator.islogged,
        lastLogout: colaborator.lastLogout,
      };
      if (colaborator.islogged == true) {
        onlineColaborators.push(colaborator);
      } else {
        colaborator.lastLogout = formatDate(colaborator.lastLogout);
        offlineColaborators.push(colaborator);
      }
    }

    const onlineCount = onlineColaborators.length;
    const offlineCount = offlineColaborators.length;

    res.status(200).json({
      onlineColaborators,
      offlineColaborators,
      onlineCount,
      offlineCount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};