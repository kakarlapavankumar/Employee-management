"use strict";

const registerForm = document.getElementById("registerForm");

const message = document.getElementById("message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = document.getElementById("employeeId").value.trim();

  const employeeName = document.getElementById("employeeName").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password validation
  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  // Get existing registered users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check duplicate email
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (existingUser) {
    message.textContent = "An account with this email already exists.";
    return;
  }

  // Create user object
  const user = {
    employeeId: employeeId,
    employeeName: employeeName,
    email: email,
    password: password,
  };

  // Store user
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful!";
  registerForm.reset();

  // Redirect to login
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
});
