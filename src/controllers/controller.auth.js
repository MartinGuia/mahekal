import User from "../models/User.model.js";
import Roles from "../models/Roles.model.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";

// Signup controller function
export const signup = async (req, res) => {
  // Body desctructuring
  const { name, lastname, userName, password, role, departament } = req.body;
  
  try {
    // Looks of the see if the user was previusly registered
    const registeredUser = await User.findOne({ userName });
    if (registeredUser)
      return res.status(400).json({ message: "Previously registered user" });
    
    // Search for the rolee as received in the params
    const roleFound = await Roles.find({ name: { $in: role } });
    
    // Encrypt password
    const passwordHash = await bcryptjs.hash(password, 10);
    
    // Instantiate a new user
    const newUser = new User({
      name: name,
      lastname: lastname,
      userName: userName,
      password: passwordHash,
      role: roleFound,
      departament: departament,
    });
    // Save a new user and respond status
    const userSaved = await newUser.save();
    return res.status(200).json({ message: "Successfully registered user" });
    
  } catch (error) {
    // Respond error and status
    res.status(500).json({ message: error.message });
  }
};

// Signin controller function
export const signin = async (req, res) => {
  // Body desctructuring
  const { userName, password } = req.body;

  try {
    // Search if the user exists
    const userFound = await User.findOne({ userName });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Gets the user's role
    const roleFound = await Roles.findById(userFound.role);

    // Compare the password sent with the database
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Create token
    const token = await createdAccessToken({
      id: userFound._id,
      role: userFound.role[0],
    });

    // Set token as cookie
    res.cookie("token", token);

    // Responsed user data
    res.json({ 
      id: userFound._id,
      userName: userFound.userName,
      tickets: userFound.tickets
      // name: userFound.name,
      // lastname: userFound.lastname,
      // userFound
     });
  } catch (error) {
    Respond 
    res.status(500).json({ message: error.message });
  }
};

// Logout controller function
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};