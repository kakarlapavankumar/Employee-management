"use strict";

/*
========================================================
SHARED EMPLOYEE DATA
========================================================

Used by:
1. Employee Directory
2. Employee Management
3. Attendance
4. Leave Management
5. HR Dashboard
6. Employee Profile

DO NOT create another employees array in employee-profile.js.
========================================================
*/

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
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP002",
    name: "Rajesh Kumar",
    department: "HR",
    designation: "HR Manager",
    email: "rajesh@gmail.com",
    phone: "9876543211",
    joiningDate: "2024-05-15",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP003",
    name: "Anil Sharma",
    department: "Finance",
    designation: "Accountant",
    email: "anil@gmail.com",
    phone: "9876543212",
    joiningDate: "2024-08-20",
    status: "Inactive",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP004",
    name: "Sneha Reddy",
    department: "IT",
    designation: "Frontend Developer",
    email: "sneha@gmail.com",
    phone: "9876543213",
    joiningDate: "2025-01-10",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP005",
    name: "Vikram Singh",
    department: "IT",
    designation: "Backend Developer",
    email: "vikram@gmail.com",
    phone: "9876543214",
    joiningDate: "2025-02-12",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP006",
    name: "Priya Sharma",
    department: "HR",
    designation: "Recruiter",
    email: "priya@gmail.com",
    phone: "9876543215",
    joiningDate: "2024-11-05",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP007",
    name: "Arjun Reddy",
    department: "Finance",
    designation: "Financial Analyst",
    email: "arjun@gmail.com",
    phone: "9876543216",
    joiningDate: "2025-03-18",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP008",
    name: "Kiran Kumar",
    department: "IT",
    designation: "DevOps Engineer",
    email: "kiran@gmail.com",
    phone: "9876543217",
    joiningDate: "2024-07-22",
    status: "Inactive",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP009",
    name: "Divya Patel",
    department: "Marketing",
    designation: "Marketing Executive",
    email: "divya@gmail.com",
    phone: "9876543218",
    joiningDate: "2025-04-08",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },

  {
    id: "EMP010",
    name: "Rahul Verma",
    department: "IT",
    designation: "Software Tester",
    email: "rahul@gmail.com",
    phone: "9876543219",
    joiningDate: "2024-09-16",
    status: "Active",
    leaveEntitlement: 20,
    photo: "../Employee-Login/assets/images/logo.png",
  },
];

/*
========================================================
GLOBAL ACCESS
========================================================
*/

window.employees = employees;

/*
========================================================
GET EMPLOYEE BY ID
========================================================
*/

function getEmployeeById(employeeId) {
  return employees.find(function (employee) {
    return (
      String(employee.id).toLowerCase() === String(employeeId).toLowerCase()
    );
  });
}

window.getEmployeeById = getEmployeeById;
