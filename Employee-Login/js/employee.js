"use strict";

// ==================================================
// EMPLOYEE ARRAY
// ==================================================

let employees = [];

// ==================================================
// EDITING EMPLOYEE ID
// ==================================================

let editingEmployeeId = null;

// ==================================================
// GET HTML ELEMENTS
// ==================================================

const employeeForm = document.getElementById("employeeForm");

const employeeIdInput = document.getElementById("employeeId");

const employeeNameInput = document.getElementById("employeeName");

const departmentInput = document.getElementById("department");

const designationInput = document.getElementById("designation");

const emailInput = document.getElementById("email");

const submitButton = document.getElementById("submitButton");

const cancelButton = document.getElementById("cancelButton");

const formTitle = document.getElementById("formTitle");

const employeeTableBody = document.getElementById("employeeTableBody");

const employeeCount = document.getElementById("employeeCount");

const emptyMessage = document.getElementById("emptyMessage");

// ==================================================
// CREATE / UPDATE EMPLOYEE
// ==================================================

employeeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // ------------------------------------------
  // GET FORM VALUES
  // ------------------------------------------

  const employeeId = employeeIdInput.value.trim();

  const employeeName = employeeNameInput.value.trim();

  const department = departmentInput.value.trim();

  const designation = designationInput.value.trim();

  const email = emailInput.value.trim();

  // ------------------------------------------
  // UPDATE OPERATION
  // ------------------------------------------

  if (editingEmployeeId !== null) {
    const employeeIndex = employees.findIndex(function (employee) {
      return employee.id === editingEmployeeId;
    });

    if (employeeIndex !== -1) {
      employees[employeeIndex] = {
        id: employeeId,

        name: employeeName,

        department: department,

        designation: designation,

        email: email,
      };
    }

    // Exit edit mode

    editingEmployeeId = null;
  }

  // ------------------------------------------
  // CREATE OPERATION
  // ------------------------------------------
  else {
    // Check duplicate Employee ID

    const employeeExists = employees.some(function (employee) {
      return employee.id.toLowerCase() === employeeId.toLowerCase();
    });

    if (employeeExists) {
      alert("Employee ID already exists.");

      return;
    }

    // Create employee object

    const employee = {
      id: employeeId,

      name: employeeName,

      department: department,

      designation: designation,

      email: email,
    };

    // Add employee to array

    employees.push(employee);
  }

  // ------------------------------------------
  // UPDATE TABLE
  // ------------------------------------------

  renderEmployees();

  // ------------------------------------------
  // UPDATE EMPLOYEE COUNT
  // ------------------------------------------

  updateEmployeeCount();

  // ------------------------------------------
  // RESET FORM
  // ------------------------------------------

  clearForm();
});

// ==================================================
// READ OPERATION
// ==================================================

function renderEmployees() {
  // Clear existing table

  employeeTableBody.innerHTML = "";

  // If there are no employees

  if (employees.length === 0) {
    emptyMessage.style.display = "block";

    return;
  }

  emptyMessage.style.display = "none";

  // Create table row for every employee

  employees.forEach(function (employee) {
    const row = document.createElement("tr");

    // Create cells

    const idCell = document.createElement("td");

    idCell.textContent = employee.id;

    const nameCell = document.createElement("td");

    nameCell.textContent = employee.name;

    const departmentCell = document.createElement("td");

    departmentCell.textContent = employee.department;

    const designationCell = document.createElement("td");

    designationCell.textContent = employee.designation;

    const emailCell = document.createElement("td");

    emailCell.textContent = employee.email;

    const actionCell = document.createElement("td");

    // --------------------------------------
    // EDIT BUTTON
    // --------------------------------------

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.className = "edit-btn";

    editButton.addEventListener("click", function () {
      editEmployee(employee.id);
    });

    // --------------------------------------
    // DELETE BUTTON
    // --------------------------------------

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
      deleteEmployee(employee.id);
    });

    // Add buttons

    actionCell.appendChild(editButton);

    actionCell.appendChild(deleteButton);

    // Add cells to row

    row.appendChild(idCell);

    row.appendChild(nameCell);

    row.appendChild(departmentCell);

    row.appendChild(designationCell);

    row.appendChild(emailCell);

    row.appendChild(actionCell);

    // Add row to table

    employeeTableBody.appendChild(row);
  });
}

// ==================================================
// EDIT EMPLOYEE
// ==================================================

function editEmployee(employeeId) {
  const employee = employees.find(function (employee) {
    return employee.id === employeeId;
  });

  if (!employee) {
    return;
  }

  // Populate form

  employeeIdInput.value = employee.id;

  employeeNameInput.value = employee.name;

  departmentInput.value = employee.department;

  designationInput.value = employee.designation;

  emailInput.value = employee.email;

  // Store editing ID

  editingEmployeeId = employee.id;

  // Change form title

  formTitle.textContent = "Update Employee";

  // Change button

  submitButton.textContent = "Update Employee";

  // Focus input

  employeeIdInput.focus();
}

// ==================================================
// DELETE EMPLOYEE
// ==================================================

function deleteEmployee(employeeId) {
  // Ask confirmation

  const confirmation = confirm("Are you sure?");

  // If user clicks Cancel

  if (!confirmation) {
    return;
  }

  // Remove employee

  employees = employees.filter(function (employee) {
    return employee.id !== employeeId;
  });

  // Refresh table

  renderEmployees();

  // Refresh count

  updateEmployeeCount();

  // If deleted employee was being edited

  if (editingEmployeeId === employeeId) {
    clearForm();
  }
}

// ==================================================
// UPDATE EMPLOYEE COUNT
// ==================================================

function updateEmployeeCount() {
  employeeCount.textContent = employees.length;
}

// ==================================================
// CLEAR FORM
// ==================================================

function clearForm() {
  employeeForm.reset();

  editingEmployeeId = null;

  formTitle.textContent = "Add Employee";

  submitButton.textContent = "Add Employee";
}

// ==================================================
// CANCEL UPDATE
// ==================================================

cancelButton.addEventListener("click", function () {
  clearForm();
});

// ==================================================
// INITIALIZE PAGE
// ==================================================

renderEmployees();

updateEmployeeCount();
