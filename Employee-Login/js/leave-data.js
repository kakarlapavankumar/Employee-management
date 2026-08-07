"use strict";

/*
==================================================
SHARED LEAVE DATA
==================================================

Used by:
1. Leave Request
2. Leave Approval
3. HR Dashboard
4. Employee Profile

Data is stored in localStorage so all pages
can access the same leave requests.
*/

const LEAVE_STORAGE_KEY = "employeeLeaveRequests";

/*
==================================================
LOAD LEAVE REQUESTS
==================================================
*/

let leaveRequests = JSON.parse(localStorage.getItem(LEAVE_STORAGE_KEY)) || [];

/*
==================================================
SAVE LEAVE REQUESTS
==================================================
*/

function saveLeaveRequests() {
  localStorage.setItem(LEAVE_STORAGE_KEY, JSON.stringify(leaveRequests));
}

/*
==================================================
GENERATE LEAVE ID
==================================================
*/

function generateLeaveId() {
  let maxNumber = 0;

  leaveRequests.forEach(function (leave) {
    const match = String(leave.id || "").match(/^LR(\d+)$/);

    if (match) {
      const number = parseInt(match[1], 10);

      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  });

  return "LR" + String(maxNumber + 1).padStart(3, "0");
}

/*
==================================================
CALCULATE LEAVE DAYS
==================================================
*/

function calculateLeaveDays(fromDate, toDate) {
  if (!fromDate || !toDate) {
    return 0;
  }

  const start = new Date(fromDate + "T00:00:00");

  const end = new Date(toDate + "T00:00:00");

  if (end < start) {
    return 0;
  }

  const difference = end.getTime() - start.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}

/*
==================================================
GET LEAVE BY ID
==================================================
*/

function getLeaveById(leaveId) {
  return leaveRequests.find(function (leave) {
    return String(leave.id) === String(leaveId);
  });
}

/*
==================================================
UPDATE LEAVE STATUS
==================================================
*/

function updateLeaveStatus(leaveId, status) {
  const leave = getLeaveById(leaveId);

  if (!leave) {
    return false;
  }

  leave.status = status;

  leave.updatedOn = new Date().toISOString();

  saveLeaveRequests();

  return true;
}

/*
==================================================
GET LEAVE COUNTS
==================================================
*/

function getLeaveCounts() {
  return {
    pending: leaveRequests.filter((leave) => leave.status === "Pending").length,

    approved: leaveRequests.filter((leave) => leave.status === "Approved")
      .length,

    rejected: leaveRequests.filter((leave) => leave.status === "Rejected")
      .length,

    cancelled: leaveRequests.filter((leave) => leave.status === "Cancelled")
      .length,
  };
}

/*
==================================================
GET EMPLOYEE LEAVE HISTORY
==================================================
*/

function getEmployeeLeaveHistory(employeeId) {
  return leaveRequests

    .filter(function (leave) {
      return (
        String(leave.employeeId).toLowerCase() ===
        String(employeeId).toLowerCase()
      );
    })

    .sort(function (a, b) {
      return new Date(b.appliedOn) - new Date(a.appliedOn);
    });
}

/*
==================================================
GET APPROVED LEAVE DAYS
==================================================
*/

function getApprovedLeaveDays(employeeId) {
  return leaveRequests

    .filter(function (leave) {
      return (
        String(leave.employeeId).toLowerCase() ===
          String(employeeId).toLowerCase() && leave.status === "Approved"
      );
    })

    .reduce(function (total, leave) {
      return total + Number(leave.totalDays || 0);
    }, 0);
}

/*
==================================================
GET EMPLOYEES CURRENTLY ON LEAVE
==================================================
*/

function getEmployeesCurrentlyOnLeave() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return leaveRequests.filter(function (leave) {
    if (leave.status !== "Approved") {
      return false;
    }

    const from = new Date(leave.fromDate + "T00:00:00");

    const to = new Date(leave.toDate + "T23:59:59");

    return today >= from && today <= to;
  });
}

/*
==================================================
GLOBAL ACCESS
==================================================
*/

window.leaveRequests = leaveRequests;

window.saveLeaveRequests = saveLeaveRequests;

window.generateLeaveId = generateLeaveId;

window.calculateLeaveDays = calculateLeaveDays;

window.getLeaveById = getLeaveById;

window.updateLeaveStatus = updateLeaveStatus;

window.getLeaveCounts = getLeaveCounts;

window.getEmployeeLeaveHistory = getEmployeeLeaveHistory;

window.getApprovedLeaveDays = getApprovedLeaveDays;

window.getEmployeesCurrentlyOnLeave = getEmployeesCurrentlyOnLeave;
