import Role from "../models/Roles.model.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    console.log(roles);
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json(error);
  }
};
