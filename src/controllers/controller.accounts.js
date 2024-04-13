import User from "../models/User.model.js";
import Role from "../models/Roles.model.js";
import Department from "../models/Department.model.js";
import Ticket from "../models/Ticket.model.js";
import bcrypt from "bcryptjs";
import { formatDate } from "../libs/formatDate.js";

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    let usersList = [];

    for (let user of users) {
      const roleUser = await Role.findById(user.role);
      const departmentUser = await Department.findById(user.department);

      user = {
        id: user.id,
        name: user.name + " " + user.lastname,
        role: roleUser.name,
        department: departmentUser.name,
      };
      usersList.push(user);
    }

    res.status(200).json(usersList);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const getUserByIdToModify = async (req, res) => {
  try {
    let userFound = await User.findById(req.params.id);
    let userDepartment = await Department.findById(userFound.department);
    const userRole = await Role.findById(userFound.role);

    const departments = await Department.find();
    const departmentList = [];

    const rolesList = await Role.find();

    userDepartment = {
      id: userDepartment.id,
      name: userDepartment.name,
    };

    for (let department of departments) {
      const departmentFound = await Department.findById(department.id);
      department = {
        id: department.id,
        name: department.name,
      };
      departmentList.push(department);
    }

    userFound = {
      id: userFound.id,
      name: userFound.name,
      lastname: userFound.lastname,
      userName: userFound.userName,
      password: "",
      role: userRole,
      department: userDepartment,
    };
    return res.status(200).json({ userFound, departmentList, rolesList });
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const updateUser = async (req, res) => {
  const { userName, role, department } = req.body;
  
  try {
    const userFound = await User.findById(req.params.id).lean();

    if (userName !== userFound.userName)
      await User.findByIdAndUpdate(userFound._id, { userName: userName });

    if (role !== userFound.role)
      await User.findByIdAndUpdate(userFound._id, { role: role });

    if (department !== userFound.department) {
      await Department.updateOne(
        { _id: userFound.department },
        { $pull: { colaborators: userFound._id } }
      );

      await Department.updateOne(
        { _id: department },
        { $push: { colaborators: userFound._id } }
      );

      await User.findByIdAndUpdate(userFound._id, { department: department });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.id, { password: passwordHash });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    // return res.status(500).json({ message: "Error updating password" });
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    let userFound = await User.findById(req.params.id);
    if (userFound === null)
      return res.status(404).json({ message: "User not found " });

    
    let tickets = userFound.tickets;
    let ticketsForUser = await Promise.all(
      tickets.map(async (idTicket) => {
        let ticket = await Ticket.findById(idTicket).lean();
        let ticketDepartment = await Department.findById(
          ticket.assignedDepartment
          );
          ticket.assignedDepartment = ticketDepartment.name;
          ticket.assignedTo = userFound.name + " " + userFound.lastname;
          ticket.date = formatDate(ticket.date);
          ticket.id = ticket._id;
          
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
        delete ticket._id;
        return ticket;
      })
    );
    userFound = {name: `${userFound.name} ${userFound.lastname}`};
    
    res.status(200).json({ticketsForUser, userFound});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    let userToDelete = await User.findById(req.params.id).lean();

    if (!userToDelete)
      return res.status(404).json({ message: "User not found" });

    const userDepartment = await Department.findByIdAndUpdate(
      userToDelete.department,
      { $pull: { colaborators: userToDelete._id } }
    );

    const userTicket = userToDelete.tickets;

    userTicket.forEach(async (ticket) => {
      const removeUser = await Ticket.findByIdAndUpdate(ticket, {
        $pull: { assignedTo: userToDelete._id },
      });
    });

    const removeUser = await User.deleteOne(userToDelete._id);

    return res.status(200).json({ message: "Ticket removed success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
