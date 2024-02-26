// Imported libreries
import User from "../models/User.model.js";
import Roles from "../models/Roles.model.js";
import Department from "../models/Departament.model.js";
import { createdAccessToken } from "../libs/jwt.js";
import bcryptjs from "bcryptjs";

// Signup get controller function
export const getSignup = async (req, res) => {
  try {
    const departmentList = [];
    const departmetsFound = await Department.find();

    if (departmetsFound.length === 0)
      return res.status(204).json("Departmets not found");

    for (let department of departmetsFound) {
      department = {
        name: department.name,
      };
      departmentList.push(department);
    }
    return res.status(200).json(departmentList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Signup post controller function
export const signup = async (req, res) => {
  // Body desctructuring
  const { name, lastname, userName, password, role, department } = req.body;

  try {
    // Looks of the see if the user was previusly registered
    const registeredUser = await User.findOne({ userName });
    if (registeredUser)
      return res.status(400).json({ message: "Previously registered user" });

    // Search for the role as received in the params
    const roleFound = await Roles.find({ name: { $in: role } });
    if (roleFound.length == 0)
      return res.status(404).json({ message: "Role not found" });

    // Find department according to the string sent
    const departmentFound = await Department.findOne({
      name: { $in: department },
    });

    // Returns status and json response if department is not found
    if (departmentFound.length == 0)
      return res.status(404).json({ message: "Department not found" });

    // Encrypt password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Instantiate a new user
    const newUser = new User({
      name: name,
      lastname: lastname,
      userName: userName,
      password: passwordHash,
      role: roleFound[0]._id,
      department: departmentFound._id,
    });

    // Updates the array of collaborators from the department collection according to it's id
    const departmentUpdated = await Department.findByIdAndUpdate(
      departmentFound._id,
      { $push: { colaborators: newUser._id } }
    );

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
    
    // Gets the user's role adn department
    const roleFound = userFound.role;
    const departmentFound = userFound.department;

    // Compare the password sent with the database
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Create token
    const token = await createdAccessToken({
      id: userFound._id,
      role: roleFound,
      department: departmentFound
    });

    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);  
    const expirationDate = new Date(localDate.getTime() + 300000);
    console.log(expirationDate)

    // Set token as cookie
    res.cookie("token", token, {maxAge: expirationDate.getTime()});  
    await User.updateOne(userFound, {logged: true, lastLogged: localDate});

    return res.status(200).json({
      id: userFound.id,
    });
  } catch (error) {
    // Respond error if exists
    res.status(500).json({ message: error.message });
  }
};

// Logout controller function
export const logout = async (req, res) => {
  // Sets empty cookie and send status
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  const userFound = await User.findByIdAndUpdate(req.user.id, {logged: false, lastLogged: localDate})

  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};