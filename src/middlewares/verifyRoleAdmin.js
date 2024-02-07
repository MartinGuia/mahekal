import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Roles.model.js";

const verifyRoleAdmin =  (req, res, next) => { 
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "No token, autorization denied." });

    jwt.verify(token, config.SECRET_KEY, async (err, user) => {
        
        if (err) return res.status(403).json({ message: "Invalid token"});
        
        const role = await Role.findById(user.role);
        role.name != "Administrador" ? res.status(401).json({ message: "Not authorized"}) : next();
    });
};

export default verifyRoleAdmin