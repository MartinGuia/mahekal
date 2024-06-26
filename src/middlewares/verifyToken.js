import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.model.js";


export const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    // Check if the token is valid
    jwt.verify(token, config.SECRET_KEY, async (error, user) => {
        if (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // The token has expired
                const now = new Date();
                const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

                const decoded = jwt.decode(token);
                const user = await User.findById(decoded.id);
                user.islogged = false;
                user.lastLogout = localDate
                user.save();

                res.cookie("token", "", {expires: new Date(0)});

                return res.status(400).json({ message: "Expired session" });
            } else {
                // Other errors, like invalid token
                return res.status(403).json({ message: "Invalid token" });
            }
        }
        req.user = user;
        next(); // Call next() only if the token is valid and not expired
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authRequired