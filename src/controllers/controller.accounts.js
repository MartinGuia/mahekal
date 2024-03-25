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
    console.log(userFound)

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

// FALTAN ALGUNAS OPCIONES AQUI
export const getUserById = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);
    res.status(200).json(userFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
