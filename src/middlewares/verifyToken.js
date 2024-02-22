import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.model.js";

export const verifyToken = async (req, res)=>{
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, config.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json(
      req.user=user
    );
  });
}

export default verifyToken