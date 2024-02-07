import jwt from "jsonwebtoken";
import config from "../config.js";

const verifyToken = (req, res, next) => { 
    const {token} = req.cookies;

    if (!token) return res.status(401).json({ message: "No token, autorization denied." });

    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token"});
        req.user = user;
    });
    next();
};

export default verifyToken