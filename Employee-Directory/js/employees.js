// ========================================
// EMPLOYEE DATA
// ========================================

const employees = [
  {
    id: 101,
    name: "Rahul Sharma",
    department: "Development",
    designation: "Senior Developer",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=12",
  },

  {
    id: 102,
    name: "Priya Reddy",
    department: "HR",
    designation: "HR Manager",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=47",
  },

  {
    id: 103,
    name: "Arjun Kumar",
    department: "Development",
    designation: "Java Developer",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=11",
  },

  {
    id: 104,
    name: "Sneha Rao",
    department: "CRM",
    designation: "CRM Executive",
    status: "On Leave",
    photo: "https://i.pravatar.cc/150?img=32",
  },

  {
    id: 105,
    name: "Vikram Singh",
    department: "Finance",
    designation: "Financial Analyst",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=13",
  },

  {
    id: 106,
    name: "Ananya Reddy",
    department: "Development",
    designation: "Frontend Developer",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=44",
  },

  {
    id: 107,
    name: "Kiran Patel",
    department: "CRM",
    designation: "CRM Manager",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=68",
  },

  {
    id: 108,
    name: "Meera Nair",
    department: "HR",
    designation: "HR Executive",
    status: "Inactive",
    photo: "https://i.pravatar.cc/150?img=45",
  },

  {
    id: 109,
    name: "Rohit Verma",
    department: "Finance",
    designation: "Accountant",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=15",
  },

  {
    id: 110,
    name: "Divya Menon",
    department: "Development",
    designation: "Software Engineer",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=49",
  },

  {
    id: 111,
    name: "Suresh Kumar",
    department: "CRM",
    designation: "Sales Executive",
    status: "On Leave",
    photo: "https://i.pravatar.cc/150?img=51",
  },

  {
    id: 112,
    name: "Kavya Sharma",
    department: "HR",
    designation: "Recruiter",
    status: "Active",
    photo: "https://i.pravatar.cc/150?img=25",
  },
];

// ========================================
// DOM ELEMENTS
// ========================================

const employeeContainer = document.getElementById("employeeContainer");

const searchInput = document.getElementById("searchInput");

const departmentFilter = document.getElementById("departmentFilter");

const resultCount = document.getElementById("resultCount");

const noResults = document.getElementById("noResults");

const logoutButton = document.getElementById("logoutButton");

const menuButton = document.getElementById("menuButton");

const sidebar = document.getElementById("sidebar");

const userName = document.getElementById("userName");

// ========================================
// CHECK LOGIN SESSION
// ========================================

const loggedInUser = sessionStorage.getItem("employeeName");

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  userName.textContent = loggedInUser;
}

// ========================================
// RENDER EMPLOYEES
// ========================================

function renderEmployees(employeeList) {
  // Clear existing cards

  employeeContainer.innerHTML = "";

  // Update count

  resultCount.textContent = `Showing ${employeeList.length} employee(s)`;

  // No results

  if (employeeList.length === 0) {
    noResults.style.display = "block";

    return;
  }

  noResults.style.display = "none";

  // Create employee card for each employee

  employeeList.forEach(function (employee) {
    const employeeCard = document.createElement("div");

    employeeCard.classList.add("employee-card");

    employeeCard.innerHTML = `

            <div class="employee-card-header">

                <span class="employee-id">
                    ID: ${employee.id}
                </span>

                <span class="
                    status-badge
                    ${getStatusClass(employee.status)}
                ">
                    ${employee.status}
                </span>

            </div>


            <div class="employee-profile">

                <img
                    src="${employee.photo}"
                    alt="${employee.name}"
                    class="employee-photo"
                >

                <div class="employee-basic-info">

                    <h3>
                        ${employee.name}
                    </h3>

                    <p>
                        ${employee.designation}
                    </p>

                </div>

            </div>


            <div class="employee-details">

                <div class="detail-item">

                    <span class="detail-label">
                        Department
                    </span>

                    <span class="detail-value">
                        ${employee.department}
                    </span>

                </div>


                <div class="detail-item">

                    <span class="detail-label">
                        Employee ID
                    </span>

                    <span class="detail-value">
                        #${employee.id}
                    </span>

                </div>

            </div>

        `;

    employeeContainer.appendChild(employeeCard);
  });
}

// ========================================
// STATUS CLASS
// ========================================

function getStatusClass(status) {
  if (status === "Active") {
    return "active";
  }

  if (status === "On Leave") {
    return "leave";
  }

  return "inactive";
}

// ========================================
// SEARCH + FILTER
// ========================================

function filterEmployees() {
  const searchValue = searchInput.value.trim().toLowerCase();

  const departmentValue = departmentFilter.value;

  // filter() creates a new array

  const filteredEmployees = employees.filter(function (employee) {
    // Search by name

    const matchesSearch = employee.name.toLowerCase().includes(searchValue);

    // Department filter

    const matchesDepartment =
      departmentValue === "all" || employee.department === departmentValue;

    // Employee must satisfy both

    return matchesSearch && matchesDepartment;
  });

  renderEmployees(filteredEmployees);
}

// ========================================
// SEARCH EVENT
// ========================================

searchInput.addEventListener("input", filterEmployees);

// ========================================
// DEPARTMENT FILTER EVENT
// ========================================

departmentFilter.addEventListener("change", filterEmployees);

// ========================================
// LOGOUT
// ========================================

logoutButton.addEventListener("click", function () {
  sessionStorage.removeItem("employeeName");

  sessionStorage.removeItem("employeeId");

  window.location.href = "index.html";
});

// ========================================
// MOBILE SIDEBAR
// ========================================

menuButton.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});

// ========================================
// INITIAL RENDER
// ========================================

renderEmployees(employees);
