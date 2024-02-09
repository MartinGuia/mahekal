import jwt from "jsonwebtoken";
import config from "../config.js";

const verifyToken = (req, res, next) => {
    // Body desctructuring 
    const {token} = req.cookies;

    // Check if token exists
    if (!token) return res.status(401).json({ message: "No token, autorization denied." });

    // Check if the token is valid
    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token"});
        req.user = user;
    });
    next();
};

export default verifyToken