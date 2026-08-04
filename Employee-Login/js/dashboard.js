// ================================
// GET USER INFORMATION
// ================================

const userName = sessionStorage.getItem("employeeName");

// ================================
// DISPLAY USER NAME
// ================================

const welcomeName = document.getElementById("welcomeName");

const userNameElement = document.getElementById("userName");

if (userName) {
  welcomeName.textContent = userName;

  userNameElement.textContent = userName;
} else {
  // If user directly opens dashboard
  // without logging in

  window.location.href = "index.html";
}

// ================================
// LOGOUT
// ================================

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {
  // Remove session information

  sessionStorage.removeItem("employeeName");

  sessionStorage.removeItem("employeeId");

  // Redirect to login

  window.location.href = "index.html";
});

// ================================
// MOBILE MENU
// ================================

const menuButton = document.getElementById("menuButton");

const sidebar = document.getElementById("sidebar");

menuButton.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});
