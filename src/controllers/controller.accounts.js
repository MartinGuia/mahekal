import User from "../models/User.model.js";
import Role from "../models/Roles.model.js";
import Departament from "../models/Departament.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    let usersList = [];

    for (let user of users) {
      const roleUser = await Role.findById(user.role);
      const departmentUser = await Departament.findById(user.department);

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

export const getUserById = async (req, res) => {
  try {
    let userFound = await User.findById(req.params.id);
    let userDepartment = await Departament.findById(userFound.department);
    const userRole = await Role.findById(userFound.role);

    const departments = await Departament.find();
    const departmentList = [];

    const rolesList = await Role.find();

    userDepartment = {
      id: userDepartment.id,
      name: userDepartment.name,
    };

    for (let department of departments) {
      const departmentFound = await Departament.findById(department.id);
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
  const { id, userName, password, role, department } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  const updateUser = await User.findByIdAndUpdate(id, {
    userName: userName,
    password: password,
    role: role,
    department: department,
  });

  res.status(200).json(updateUser);
};
