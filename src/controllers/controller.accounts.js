import User from "../models/User.model.js";
import Role from "../models/Roles.model.js";
import Departament from "../models/Departament.model.js";

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
      };

      res.status(200).json(usersList);
    } catch (error) {
      return res.status(500).json({ error: error });
    };
};

export const getUserById = async (req,res) => {
    try {
        const userFound = await User.findById(req.params.id);
        
        return res.status(200).json(userFound);
    } catch (error) {
        return res.status(500).json({ message: "User not found" });        
    }
};
