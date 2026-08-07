"use strict";

/*
========================================================
EMPLOYEE PROFILE
========================================================

Data sources:

1. employees
   -> employee-data.js

2. employeeLeaveRequests
   -> leave-management / leave-approval

3. attendanceData
   -> attendance module

NO NEW EMPLOYEE DATASET IS CREATED HERE.
========================================================
*/

/* =====================================================
   GET EMPLOYEE ID
===================================================== */

const urlParams = new URLSearchParams(window.location.search);

const selectedEmployeeId = urlParams.get("id") || "EMP001";

/* =====================================================
   GET EMPLOYEE
===================================================== */

let employee = null;

if (typeof employees !== "undefined" && Array.isArray(employees)) {
  employee = employees.find(function (item) {
    return (
      String(item.id).toLowerCase() === String(selectedEmployeeId).toLowerCase()
    );
  });
}

/* =====================================================
   DOM ELEMENTS
===================================================== */

const employeeAvatar = document.getElementById("employeeAvatar");

const employeeName = document.getElementById("employeeName");

const employeeDesignation = document.getElementById("employeeDesignation");

const employeeStatus = document.getElementById("employeeStatus");

const employeeId = document.getElementById("employeeId");

const detailName = document.getElementById("detailName");

const department = document.getElementById("department");

const designation = document.getElementById("designation");

const email = document.getElementById("email");

const phone = document.getElementById("phone");

const joiningDate = document.getElementById("joiningDate");

const leaveBalance = document.getElementById("leaveBalance");

const workingDays = document.getElementById("workingDays");

const presentDays = document.getElementById("presentDays");

const leaveDays = document.getElementById("leaveDays");

const attendancePercentage = document.getElementById("attendancePercentage");

const leaveHistory = document.getElementById("leaveHistory");

const recordCount = document.getElementById("recordCount");

/* =====================================================
   STOP IF EMPLOYEE DOES NOT EXIST
===================================================== */

if (!employee) {
  showEmployeeNotFound();
} else {
  loadEmployeeProfile();
}

/* =====================================================
   LOAD EMPLOYEE PROFILE
===================================================== */

function loadEmployeeProfile() {
  employeeAvatar.textContent = getInitials(employee.name);

  employeeName.textContent = employee.name || "-";

  employeeDesignation.textContent = employee.designation || "-";

  employeeStatus.textContent = employee.status || "Active";

  employeeId.textContent = employee.id || "-";

  detailName.textContent = employee.name || "-";

  department.textContent = employee.department || "-";

  designation.textContent = employee.designation || "-";

  email.textContent = employee.email || "-";

  phone.textContent = employee.phone || "N/A";

  joiningDate.textContent = formatDate(employee.joiningDate);

  loadLeaveInformation();

  loadAttendanceInformation();
}

/* =====================================================
   EMPLOYEE INITIALS
===================================================== */

function getInitials(name) {
  if (!name) {
    return "E";
  }

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateValue) {
  if (!dateValue) {
    return "N/A";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* =====================================================
   GET LEAVE REQUESTS
===================================================== */

function getLeaveRequests() {
  try {
    const storedData = localStorage.getItem("employeeLeaveRequests");

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Unable to read leave data:", error);

    return [];
  }
}

/* =====================================================
   LOAD LEAVE INFORMATION
===================================================== */

function loadLeaveInformation() {
  const allLeaves = getLeaveRequests();

  const employeeLeaves = allLeaves.filter(function (leave) {
    return (
      String(leave.employeeId).toLowerCase() ===
      String(employee.id).toLowerCase()
    );
  });

  /*
  -------------------------------------------------------
  ONLY APPROVED LEAVES ARE DEDUCTED FROM BALANCE
  -------------------------------------------------------
  */

  const approvedLeaveDays = employeeLeaves
    .filter(function (leave) {
      return leave.status === "Approved";
    })
    .reduce(function (total, leave) {
      return total + Number(leave.totalDays || 0);
    }, 0);

  /*
  -------------------------------------------------------
  TOTAL ENTITLEMENT
  -------------------------------------------------------
  */

  const totalLeaveEntitlement = Number(employee.leaveEntitlement || 20);

  /*
  -------------------------------------------------------
  REMAINING BALANCE
  -------------------------------------------------------
  */

  const remainingLeave = Math.max(totalLeaveEntitlement - approvedLeaveDays, 0);

  leaveBalance.textContent = remainingLeave + " Days";

  /*
  -------------------------------------------------------
  LEAVE HISTORY
  -------------------------------------------------------
  */

  renderLeaveHistory(employeeLeaves);
}

/* =====================================================
   RENDER LEAVE HISTORY
===================================================== */

function renderLeaveHistory(leaves) {
  leaveHistory.innerHTML = "";

  recordCount.textContent = leaves.length + " Records";

  if (leaves.length === 0) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td
        colspan="7"
        class="empty-row"
      >
        No leave records found for this employee.
      </td>
    `;

    leaveHistory.appendChild(row);

    return;
  }

  /*
  -------------------------------------------------------
  SORT LATEST FIRST
  -------------------------------------------------------
  */

  leaves.sort(function (a, b) {
    return new Date(b.appliedOn || 0) - new Date(a.appliedOn || 0);
  });

  leaves.forEach(function (leave) {
    const row = document.createElement("tr");

    const status = String(leave.status || "Pending").toLowerCase();

    row.innerHTML = `

      <td>
        ${escapeHTML(leave.id || "-")}
      </td>

      <td>
        ${escapeHTML(leave.leaveType || "-")}
      </td>

      <td>
        ${escapeHTML(formatDate(leave.fromDate))}
      </td>

      <td>
        ${escapeHTML(formatDate(leave.toDate))}
      </td>

      <td>
        <strong>
          ${Number(leave.totalDays || 0)}
        </strong>
      </td>

      <td>
        ${escapeHTML(leave.reason || "-")}
      </td>

      <td>

        <span class="leave-status ${status}">
          ${escapeHTML(leave.status || "Pending")}
        </span>

      </td>

    `;

    leaveHistory.appendChild(row);
  });
}

/* =====================================================
   GET ATTENDANCE DATA
===================================================== */

function getAttendanceRecords() {
  try {
    const storedData = localStorage.getItem("attendanceData");

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Unable to read attendance data:", error);

    return [];
  }
}

/* =====================================================
   LOAD ATTENDANCE INFORMATION
===================================================== */

function loadAttendanceInformation() {
  const attendance = getAttendanceRecords();

  /*
  -------------------------------------------------------
  SUPPORT DIFFERENT ATTENDANCE DATA FORMATS
  -------------------------------------------------------

  Format 1:

  {
    id: "EMP001",
    status: "Present"
  }


  Format 2:

  {
    employeeId: "EMP001",
    status: "Present",
    date: "2026-08-07"
  }
  -------------------------------------------------------
  */

  const employeeAttendance = attendance.filter(function (record) {
    const recordEmployeeId = record.employeeId || record.id;

    return (
      String(recordEmployeeId).toLowerCase() ===
      String(employee.id).toLowerCase()
    );
  });

  const totalWorkingDays = employeeAttendance.length;

  const presentCount = employeeAttendance.filter(function (record) {
    return record.status === "Present";
  }).length;

  const halfDayCount = employeeAttendance.filter(function (record) {
    return record.status === "Half Day";
  }).length;

  /*
  -------------------------------------------------------
  HALF DAY = 0.5 PRESENT DAY
  -------------------------------------------------------
  */

  const effectivePresentDays = presentCount + halfDayCount * 0.5;

  let percentage = 0;

  if (totalWorkingDays > 0) {
    percentage = (effectivePresentDays / totalWorkingDays) * 100;
  }

  /*
  -------------------------------------------------------
  LEAVE DAYS

  Count approved leave days from leave requests.
  -------------------------------------------------------
  */

  const leaves = getLeaveRequests();

  const employeeApprovedLeaves = leaves.filter(function (leave) {
    return (
      String(leave.employeeId).toLowerCase() ===
        String(employee.id).toLowerCase() && leave.status === "Approved"
    );
  });

  const approvedLeaveDays = employeeApprovedLeaves.reduce(function (
    total,
    leave,
  ) {
    return total + Number(leave.totalDays || 0);
  }, 0);

  workingDays.textContent = totalWorkingDays;

  presentDays.textContent = effectivePresentDays;

  leaveDays.textContent = approvedLeaveDays;

  attendancePercentage.textContent = percentage.toFixed(0) + "%";
}

/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value == null ? "" : String(value);

  return div.innerHTML;
}

/* =====================================================
   EMPLOYEE NOT FOUND
===================================================== */

function showEmployeeNotFound() {
  employeeAvatar.textContent = "?";

  employeeName.textContent = "Employee Not Found";

  employeeDesignation.textContent = "Employee data is unavailable";

  employeeStatus.textContent = "Unavailable";

  employeeStatus.style.background = "#fee2e2";

  employeeStatus.style.color = "#991b1b";

  employeeId.textContent = "-";

  detailName.textContent = "-";

  department.textContent = "-";

  designation.textContent = "-";

  email.textContent = "-";

  phone.textContent = "-";

  joiningDate.textContent = "-";

  leaveBalance.textContent = "0 Days";

  workingDays.textContent = "0";

  presentDays.textContent = "0";

  leaveDays.textContent = "0";

  attendancePercentage.textContent = "0%";

  leaveHistory.innerHTML = `

    <tr>

      <td
        colspan="7"
        class="empty-row"
      >
        Employee data is unavailable.
      </td>

    </tr>

  `;
}

/* =====================================================
   PRINT
===================================================== */

function printProfile() {
  window.print();
}

/* =====================================================
   DOWNLOAD UI
===================================================== */

function downloadProfile() {
  alert("Download Profile feature is UI only for this task.");
}

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.printProfile = printProfile;

window.downloadProfile = downloadProfile;
