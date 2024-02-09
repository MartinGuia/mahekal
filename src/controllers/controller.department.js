import Department from "../models/Departament.model.js";

// Create a new Departament function
export const newDepartment = async (req, res) => {
  // Body desctructuring
  const { name } = req.body;

  try {
    // Find department by name
    const departmentFound = await Department.findOne({ name });
    
    // If department has already been registered, return status and response
    if (departmentFound)
      return res
        .status(400)
        .json({ message: "Department registered previously" });

    // Create a new department instance
    const newDepartment = new Department({
      name: name,
    });
    
    // Save department and return status and response
    const savedDepartment = newDepartment.save();
    res.status(201).json({ message: "Department created successfully" });

  } catch (error) {
    // Return status and response if there is an error
    res.status(500).json({ message: error.message });
  }
};