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

export const getAllDepartments = async (req, res) => {  
  // Find all department, if not found return status and message
  const departmentsFound = await Department.find();
  if (departmentsFound.length === 0) return res.status(204).json({ message: "There are no departments available." });

  // Make new object with department information
  const listDepartments = departmentsFound.map(departments => {
    return {
      id: departments.id,
      name: departments.name,
      colaborators: departments.colaborators.length,
      tickets: departments.ticketsDepartment.length
    };
  });
  // Returns status and list with news obbjects
  return res.status(200).json(listDepartments);
};

export const getTicketByDepartment = async (req,res) => {
  // console.log(req.user);
  
};