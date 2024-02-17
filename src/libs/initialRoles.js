import Role from "../models/Roles.model.js";

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
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
