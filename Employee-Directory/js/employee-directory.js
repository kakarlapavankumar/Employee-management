"use strict";

const employeeContainer = document.getElementById("employeeContainer");

const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const designationFilter = document.getElementById("designationFilter");
const statusFilter = document.getElementById("statusFilter");
const sortOption = document.getElementById("sortOption");
const resetBtn = document.getElementById("resetBtn");

populateDropdowns();

applyFilters();

function populateDropdowns() {
  const departments = [...new Set(employees.map((emp) => emp.department))];

  const designations = [...new Set(employees.map((emp) => emp.designation))];

  departments.forEach((department) => {
    departmentFilter.innerHTML += `<option value="${department}">${department}</option>`;
  });

  designations.forEach((designation) => {
    designationFilter.innerHTML += `<option value="${designation}">${designation}</option>`;
  });
}

function applyFilters() {
  let filtered = [...employees];

  const keyword = searchInput.value.toLowerCase();

  if (keyword) {
    filtered = filtered.filter(
      (emp) =>
        emp.name.toLowerCase().includes(keyword) ||
        emp.id.toLowerCase().includes(keyword),
    );
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(
      (emp) => emp.department === departmentFilter.value,
    );
  }

  if (designationFilter.value) {
    filtered = filtered.filter(
      (emp) => emp.designation === designationFilter.value,
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter((emp) => emp.status === statusFilter.value);
  }

  switch (sortOption.value) {
    case "nameAsc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "nameDesc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;

    case "idAsc":
      filtered.sort((a, b) => a.id.localeCompare(b.id));
      break;

    case "idDesc":
      filtered.sort((a, b) => b.id.localeCompare(a.id));
      break;
  }

  renderEmployees(filtered);
}

function renderEmployees(data) {
  employeeContainer.innerHTML = "";

  if (data.length === 0) {
    employeeContainer.innerHTML = "<h2>No Employees Found</h2>";

    return;
  }

  data.forEach((employee) => {
    employeeContainer.innerHTML += `

        <div class="employee-card">

            <img
            src="../Employee-Login/assets/images/employee-placeholder.png"
            class="employee-photo"
            alt="Employee">

            <h2>${employee.name}</h2>

            <p><strong>ID:</strong> ${employee.id}</p>

            <p><strong>Department:</strong> ${employee.department}</p>

            <p><strong>Designation:</strong> ${employee.designation}</p>

            <p><strong>Email:</strong> ${employee.email}</p>

            <p>

                <strong>Status:</strong>

                <span class="status ${employee.status.toLowerCase()}">

                    ${employee.status}

                </span>

            </p>

        </div>

        `;
  });
}

searchInput.addEventListener("input", applyFilters);

departmentFilter.addEventListener("change", applyFilters);

designationFilter.addEventListener("change", applyFilters);

statusFilter.addEventListener("change", applyFilters);

sortOption.addEventListener("change", applyFilters);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";

  departmentFilter.value = "";

  designationFilter.value = "";

  statusFilter.value = "";

  sortOption.value = "";

  applyFilters();
});
