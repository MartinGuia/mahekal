import Role from "../models/Roles.model.js";
import User from "../models/User.model.js";
import Department from "../models/Department.model.js";
import bcryptjs from "bcryptjs";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "Administrador" }).save(),
      new Role({ name: "Gerente Administrador" }).save(),
      new Role({ name: "Gerente Área" }).save(),
      new Role({ name: "Operador" }).save(),
    ]);
    
    const roleAdmin = await Role.find({name: "Administrador"});

    const countDep = await Department.estimatedDocumentCount();
    if (countDep > 0) return;

    const deps = await Promise.all([
      new Department({ name: "Sistemas" }).save(),
    ]);

    const depSistemas = await Department.find({name: "Sistemas" });

    const countUsers = await User.estimatedDocumentCount();
    if (countDep > 0) return;

    const users = await Promise.all([
      new User({
        name: "admin",
        lastname: "admin",
        userName: "rootAdmin",
        password: await bcryptjs.hash("qwerty123", 10),
        role: roleAdmin[0]._id,
        department: depSistemas[0]._id
      }).save()
    ]);

  } catch (error) {
    return res.status8(400).json(error)
  }
};
