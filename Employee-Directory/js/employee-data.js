// ==========================================
// EMPLOYEE DATA
// Shared by:
// Employee Directory
// Employee Management
// Attendance
// HR Dashboard
// Employee Profile
// ==========================================

"use strict";

// ==========================================
// EMPLOYEE ARRAY
// ==========================================

const employees = [
  {
    id: "EMP001",
    name: "Pavan Kumar",
    department: "IT",
    designation: "Java Developer",
    email: "pavan@gmail.com",
    phone: "9876543210",
    joiningDate: "2025-06-10",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP002",
    name: "Rajesh Kumar",
    department: "HR",
    designation: "HR Manager",
    email: "rajesh@gmail.com",
    phone: "9876543211",
    joiningDate: "2024-03-15",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP003",
    name: "Anil Sharma",
    department: "Finance",
    designation: "Accountant",
    email: "anil@gmail.com",
    phone: "9876543212",
    joiningDate: "2024-07-22",
    status: "Inactive",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP004",
    name: "Priya Reddy",
    department: "IT",
    designation: "Frontend Developer",
    email: "priya@gmail.com",
    phone: "9876543213",
    joiningDate: "2025-01-08",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP005",
    name: "Suresh Babu",
    department: "IT",
    designation: "Backend Developer",
    email: "suresh@gmail.com",
    phone: "9876543214",
    joiningDate: "2024-11-18",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP006",
    name: "Sneha Rani",
    department: "HR",
    designation: "HR Executive",
    email: "sneha@gmail.com",
    phone: "9876543215",
    joiningDate: "2025-02-12",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP007",
    name: "Vikram Singh",
    department: "Finance",
    designation: "Financial Analyst",
    email: "vikram@gmail.com",
    phone: "9876543216",
    joiningDate: "2023-09-25",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP008",
    name: "Anjali Rao",
    department: "Marketing",
    designation: "Marketing Executive",
    email: "anjali@gmail.com",
    phone: "9876543217",
    joiningDate: "2025-04-05",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP009",
    name: "Kiran Kumar",
    department: "IT",
    designation: "DevOps Engineer",
    email: "kiran@gmail.com",
    phone: "9876543218",
    joiningDate: "2024-08-19",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP010",
    name: "Meena Devi",
    department: "Sales",
    designation: "Sales Executive",
    email: "meena@gmail.com",
    phone: "9876543219",
    joiningDate: "2023-12-11",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP011",
    name: "Arjun Reddy",
    department: "IT",
    designation: "Software Engineer",
    email: "arjun@gmail.com",
    phone: "9876543220",
    joiningDate: "2025-05-14",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP012",
    name: "Divya Sharma",
    department: "Finance",
    designation: "Senior Accountant",
    email: "divya@gmail.com",
    phone: "9876543221",
    joiningDate: "2024-02-20",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP013",
    name: "Rohit Verma",
    department: "Marketing",
    designation: "Marketing Manager",
    email: "rohit@gmail.com",
    phone: "9876543222",
    joiningDate: "2023-06-17",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP014",
    name: "Lakshmi Priya",
    department: "HR",
    designation: "Recruiter",
    email: "lakshmi@gmail.com",
    phone: "9876543223",
    joiningDate: "2025-03-10",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP015",
    name: "Manoj Kumar",
    department: "IT",
    designation: "QA Engineer",
    email: "manoj@gmail.com",
    phone: "9876543224",
    joiningDate: "2024-10-07",
    status: "Active",
    photo: "../Employee-Login/assets/images/logo.png",
  },
];

// ==========================================
// GET EMPLOYEE BY ID
// ==========================================

function getEmployeeById(employeeId) {
  return employees.find(
    (employee) =>
      String(employee.id).toLowerCase() === String(employeeId).toLowerCase(),
  );
}

// ==========================================
// GET EMPLOYEE BY NAME
// ==========================================

function getEmployeeByName(employeeName) {
  return employees.find(
    (employee) =>
      String(employee.name).toLowerCase() ===
      String(employeeName).toLowerCase(),
  );
}

// ==========================================
// SEARCH EMPLOYEES
// ==========================================

function searchEmployees(searchValue) {
  const search = String(searchValue).toLowerCase().trim();

  if (!search) {
    return employees;
  }

  return employees.filter((employee) => {
    return (
      employee.id.toLowerCase().includes(search) ||
      employee.name.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.designation.toLowerCase().includes(search)
    );
  });
}

// ==========================================
// GET EMPLOYEES BY DEPARTMENT
// ==========================================

function getEmployeesByDepartment(department) {
  if (!department) {
    return employees;
  }

  return employees.filter((employee) => employee.department === department);
}

// ==========================================
// GET EMPLOYEES BY STATUS
// ==========================================

function getEmployeesByStatus(status) {
  if (!status) {
    return employees;
  }

  return employees.filter((employee) => employee.status === status);
}

// ==========================================
// GET DEPARTMENTS
// ==========================================

function getDepartments() {
  return [...new Set(employees.map((employee) => employee.department))].sort();
}

// ==========================================
// GET DESIGNATIONS
// ==========================================

function getDesignations() {
  return [...new Set(employees.map((employee) => employee.designation))].sort();
}

// ==========================================
// GET ACTIVE EMPLOYEES
// ==========================================

function getActiveEmployees() {
  return employees.filter((employee) => employee.status === "Active");
}

// ==========================================
// GET INACTIVE EMPLOYEES
// ==========================================

function getInactiveEmployees() {
  return employees.filter((employee) => employee.status === "Inactive");
}

// ==========================================
// EMPLOYEE COUNTS
// ==========================================

function getEmployeeCounts() {
  return {
    total: employees.length,

    active: employees.filter((employee) => employee.status === "Active").length,

    inactive: employees.filter((employee) => employee.status === "Inactive")
      .length,
  };
}

// ==========================================
// GLOBAL ACCESS
// ==========================================
//
// Allows other existing scripts to access
// the shared employee data even if they
// expect window.employees.
//

window.employees = employees;

window.getEmployeeById = getEmployeeById;

window.getEmployeeByName = getEmployeeByName;

window.searchEmployees = searchEmployees;

window.getEmployeesByDepartment = getEmployeesByDepartment;

window.getEmployeesByStatus = getEmployeesByStatus;

window.getDepartments = getDepartments;

window.getDesignations = getDesignations;

window.getActiveEmployees = getActiveEmployees;

window.getInactiveEmployees = getInactiveEmployees;

window.getEmployeeCounts = getEmployeeCounts;
