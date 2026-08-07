"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leaveForm");

  const employeeId = document.getElementById("employeeId");

  const employeeName = document.getElementById("employeeName");

  const department = document.getElementById("department");

  const leaveType = document.getElementById("leaveType");

  const fromDate = document.getElementById("fromDate");

  const toDate = document.getElementById("toDate");

  const reason = document.getElementById("reason");

  const totalDays = document.getElementById("totalDays");

  const successMessage = document.getElementById("successMessage");

  const errorMessage = document.getElementById("errorMessage");

  /*
        ====================================================
        EMPLOYEE ID AUTO-FILL
        ====================================================
        */

  employeeId.addEventListener("blur", function () {
    const employee =
      typeof getEmployeeById === "function"
        ? getEmployeeById(employeeId.value.trim())
        : null;

    if (!employee) {
      return;
    }

    employeeName.value = employee.name;

    department.value = employee.department;
  });

  /*
        ====================================================
        FROM DATE
        ====================================================
        */

  fromDate.addEventListener("change", function () {
    toDate.min = fromDate.value;

    if (toDate.value && toDate.value < fromDate.value) {
      toDate.value = "";

      totalDays.textContent = "0 Days";
    }

    calculateAndDisplayDays();
  });

  /*
        ====================================================
        TO DATE
        ====================================================
        */

  toDate.addEventListener("change", calculateAndDisplayDays);

  /*
        ====================================================
        CALCULATE DAYS
        ====================================================
        */

  function calculateAndDisplayDays() {
    if (!fromDate.value || !toDate.value) {
      totalDays.textContent = "0 Days";

      return;
    }

    const days = calculateLeaveDays(fromDate.value, toDate.value);

    if (!days) {
      totalDays.textContent = "Invalid Date Range";

      return;
    }

    totalDays.textContent = `${days} Day${days === 1 ? "" : "s"}`;
  }

  /*
        ====================================================
        SUBMIT
        ====================================================
        */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    successMessage.textContent = "";

    errorMessage.textContent = "";

    /*
                --------------------------------------------
                VALIDATION
                --------------------------------------------
                */

    if (
      !employeeId.value.trim() ||
      !employeeName.value.trim() ||
      !department.value.trim() ||
      !leaveType.value ||
      !fromDate.value ||
      !toDate.value ||
      !reason.value.trim()
    ) {
      errorMessage.textContent = "Please fill all required fields.";

      return;
    }

    /*
                --------------------------------------------
                VALIDATE EMPLOYEE
                --------------------------------------------
                */

    const employee =
      typeof getEmployeeById === "function"
        ? getEmployeeById(employeeId.value.trim())
        : null;

    if (!employee) {
      errorMessage.textContent = "Employee ID not found.";

      return;
    }

    /*
                --------------------------------------------
                DATE VALIDATION
                --------------------------------------------
                */

    if (toDate.value < fromDate.value) {
      errorMessage.textContent = "To Date cannot be earlier than From Date.";

      return;
    }

    /*
                --------------------------------------------
                CALCULATE DAYS
                --------------------------------------------
                */

    const days = calculateLeaveDays(fromDate.value, toDate.value);

    if (!days) {
      errorMessage.textContent = "Please select a valid date range.";

      return;
    }

    /*
                --------------------------------------------
                CREATE REQUEST
                --------------------------------------------
                */

    const leaveRequest = {
      id: generateLeaveId(),

      employeeId: employee.id,

      employeeName: employee.name,

      department: employee.department,

      leaveType: leaveType.value,

      fromDate: fromDate.value,

      toDate: toDate.value,

      totalDays: days,

      reason: reason.value.trim(),

      status: "Pending",

      appliedOn: new Date().toISOString(),
    };

    /*
                --------------------------------------------
                ADD TO SHARED ARRAY
                --------------------------------------------
                */

    leaveRequests.push(leaveRequest);

    saveLeaveRequests();

    /*
                --------------------------------------------
                SUCCESS
                --------------------------------------------
                */

    successMessage.textContent = `Leave request ${leaveRequest.id} submitted successfully.`;

    form.reset();

    toDate.removeAttribute("min");

    totalDays.textContent = "0 Days";
  });

  /*
        ====================================================
        RESET
        ====================================================
        */

  form.addEventListener("reset", function () {
    setTimeout(function () {
      successMessage.textContent = "";

      errorMessage.textContent = "";

      totalDays.textContent = "0 Days";

      toDate.removeAttribute("min");
    }, 0);
  });
});
