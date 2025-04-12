const data = {
  employees: require('../model/employees.json'),
  setEmployees: (data) => (this.employees = data),
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  res.json({ id: req.params.id });
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: 'First and last names are required.' });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
  res.json({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.body.id,
  });
};

const deleteEmployee = (req, res) => {
  res.json({ id: req.body.id });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
