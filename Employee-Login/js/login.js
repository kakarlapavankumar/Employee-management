// ================================
// LOGIN ELEMENTS
// ================================

const loginForm = document.getElementById("loginForm");

const employeeIdInput = document.getElementById("employeeId");

const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const errorMessage = document.getElementById("errorMessage");

const togglePassword = document.getElementById("togglePassword");

// ================================
// DEMO USER
// ================================

const demoUser = {
  employeeId: "admin",
  password: "admin123",
  name: "Admin User",
};

// ================================
// REMEMBER ME
// ================================

const savedEmployeeId = localStorage.getItem("employeeId");

if (savedEmployeeId) {
  employeeIdInput.value = savedEmployeeId;
  rememberMe.checked = true;
}

// ================================
// PASSWORD SHOW / HIDE
// ================================

togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    togglePassword.textContent = "Hide";
  } else {
    passwordInput.type = "password";

    togglePassword.textContent = "Show";
  }
});

// ================================
// LOGIN
// ================================

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = employeeIdInput.value.trim();

  const password = passwordInput.value.trim();

  // Check credentials

  if (employeeId === demoUser.employeeId && password === demoUser.password) {
    // Store employee information

    sessionStorage.setItem("employeeName", demoUser.name);

    sessionStorage.setItem("employeeId", demoUser.employeeId);

    // Remember employee ID

    if (rememberMe.checked) {
      localStorage.setItem("employeeId", employeeId);
    } else {
      localStorage.removeItem("employeeId");
    }

    // Redirect to dashboard

    window.location.href = "dashboard.html";
  } else {
    // Display error

    errorMessage.classList.add("show");

    passwordInput.value = "";
  }
});
