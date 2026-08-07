"use strict";

/*
========================================================
ATTENDANCE MODULE
========================================================
This file owns:
- Attendance data
- localStorage
- Attendance table
- Search
- Filters
- Summary
- Mark
- Update
- Reset

Other modules can reuse this file.
========================================================
*/

// ======================================================
// STORAGE
// ======================================================

const ATTENDANCE_STORAGE_KEY = "attendanceData";

let attendanceData =
  JSON.parse(localStorage.getItem(ATTENDANCE_STORAGE_KEY)) || [];

// ======================================================
// SAVE
// ======================================================

function saveAttendance() {
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendanceData));
}

// ======================================================
// GET ALL ATTENDANCE
// ======================================================

function getAttendanceData() {
  return attendanceData;
}

// ======================================================
// GET ONE EMPLOYEE ATTENDANCE
// ======================================================

function getEmployeeAttendance(employeeId) {
  return attendanceData.find(
    (record) =>
      String(record.id).toLowerCase() === String(employeeId).toLowerCase(),
  );
}

// ======================================================
// GET STATUS
// ======================================================

function getEmployeeAttendanceStatus(employeeId) {
  const record = getEmployeeAttendance(employeeId);

  return record ? record.status : "Not Marked";
}

// ======================================================
// COUNT STATUS
// ======================================================

function countStatus(status) {
  return attendanceData.filter((record) => record.status === status).length;
}

// ======================================================
// SUMMARY
// ======================================================

function getAttendanceSummary() {
  const total = typeof employees !== "undefined" ? employees.length : 0;

  const marked = attendanceData.length;

  return {
    total: total,

    marked: marked,

    notMarked: Math.max(total - marked, 0),

    present: countStatus("Present"),

    absent: countStatus("Absent"),

    halfDay: countStatus("Half Day"),

    wfh: countStatus("WFH"),
  };
}

// ======================================================
// MARK / UPDATE
// ======================================================

function markEmployeeAttendance(employeeId, status) {
  if (!employeeId || !status) {
    return false;
  }

  const employee =
    typeof getEmployeeById === "function" ? getEmployeeById(employeeId) : null;

  if (!employee) {
    return false;
  }

  const existing = attendanceData.find((record) => record.id === employeeId);

  if (existing) {
    existing.status = status;
  } else {
    attendanceData.push({
      id: employeeId,
      status: status,
    });
  }

  saveAttendance();

  return true;
}

// ======================================================
// RESET ONE EMPLOYEE
// ======================================================

function resetEmployeeAttendance(employeeId) {
  const oldLength = attendanceData.length;

  attendanceData = attendanceData.filter((record) => record.id !== employeeId);

  saveAttendance();

  return oldLength !== attendanceData.length;
}

// ======================================================
// DOM ELEMENTS
// ======================================================

const attendanceTable = document.getElementById("attendanceTable");

const attendanceSearchInput = document.getElementById("searchInput");

const attendanceDepartmentFilter = document.getElementById("departmentFilter");

const attendanceStatusFilter = document.getElementById("statusFilter");

const attendanceResetButton = document.getElementById("resetBtn");

// ======================================================
// BADGE CLASS
// ======================================================

function getBadgeClass(status) {
  switch (status) {
    case "Present":
      return "present";

    case "Absent":
      return "absent";

    case "Half Day":
      return "half-day";

    case "WFH":
      return "wfh";

    default:
      return "not-marked";
  }
}

// ======================================================
// LOAD TABLE
// ======================================================

function loadAttendance(
  employeeList = typeof employees !== "undefined" ? employees : [],
) {
  if (!attendanceTable) {
    return;
  }

  attendanceTable.innerHTML = "";

  employeeList.forEach((employee) => {
    const record = getEmployeeAttendance(employee.id);

    const status = record ? record.status : "Not Marked";

    const row = document.createElement("tr");

    row.innerHTML = `

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.department}</td>

            <td>${employee.designation}</td>

            <td>

                <select
                    id="attendance-${employee.id}"
                    class="attendance-select"
                >

                    <option
                        value=""
                        ${status === "Not Marked" ? "selected" : ""}
                    >
                        Select Status
                    </option>

                    <option
                        value="Present"
                        ${status === "Present" ? "selected" : ""}
                    >
                        Present
                    </option>

                    <option
                        value="Absent"
                        ${status === "Absent" ? "selected" : ""}
                    >
                        Absent
                    </option>

                    <option
                        value="Half Day"
                        ${status === "Half Day" ? "selected" : ""}
                    >
                        Half Day
                    </option>

                    <option
                        value="WFH"
                        ${status === "WFH" ? "selected" : ""}
                    >
                        WFH
                    </option>

                </select>

            </td>

            <td>

                <span
                    class="attendance-badge ${getBadgeClass(status)}"
                >
                    ${status}
                </span>

            </td>

            <td>

                <button
                    class="action-btn mark-btn"
                    onclick="markAttendance('${employee.id}')"
                >
                    ${record ? "Update" : "Mark"}
                </button>

                <button
                    class="action-btn reset-btn"
                    onclick="resetAttendance('${employee.id}')"
                >
                    Reset
                </button>

            </td>
        `;

    attendanceTable.appendChild(row);
  });

  updateSummary();
}

// ======================================================
// PAGE MARK BUTTON
// ======================================================

function markAttendance(employeeId) {
  const select = document.getElementById("attendance-" + employeeId);

  if (!select) {
    return;
  }

  const status = select.value;

  if (!status) {
    alert("Please select an attendance status.");

    return;
  }

  markEmployeeAttendance(employeeId, status);

  loadAttendance();
}

// ======================================================
// PAGE RESET BUTTON
// ======================================================

function resetAttendance(employeeId) {
  resetEmployeeAttendance(employeeId);

  loadAttendance();
}

// ======================================================
// UPDATE SUMMARY UI
// ======================================================

function updateSummary() {
  const summary = getAttendanceSummary();

  const total = document.getElementById("totalEmployees");

  const present = document.getElementById("presentCount");

  const absent = document.getElementById("absentCount");

  const halfDay = document.getElementById("halfDayCount");

  const wfh = document.getElementById("wfhCount");

  if (total) {
    total.textContent = summary.total;
  }

  if (present) {
    present.textContent = summary.present;
  }

  if (absent) {
    absent.textContent = summary.absent;
  }

  if (halfDay) {
    halfDay.textContent = summary.halfDay;
  }

  if (wfh) {
    wfh.textContent = summary.wfh;
  }
}

// ======================================================
// FILTER
// ======================================================

function filterAttendance() {
  if (!attendanceSearchInput) {
    return;
  }

  const search = attendanceSearchInput.value.toLowerCase().trim();

  const department = attendanceDepartmentFilter
    ? attendanceDepartmentFilter.value
    : "";

  const status = attendanceStatusFilter ? attendanceStatusFilter.value : "";

  const filtered = employees.filter((employee) => {
    const employeeStatus = getEmployeeAttendanceStatus(employee.id);

    const searchMatch =
      employee.id.toLowerCase().includes(search) ||
      employee.name.toLowerCase().includes(search);

    const departmentMatch = !department || employee.department === department;

    const statusMatch = !status || employeeStatus === status;

    return searchMatch && departmentMatch && statusMatch;
  });

  loadAttendance(filtered);
}

// ======================================================
// EVENTS
// ======================================================

if (attendanceSearchInput) {
  attendanceSearchInput.addEventListener("input", filterAttendance);
}

if (attendanceDepartmentFilter) {
  attendanceDepartmentFilter.addEventListener("change", filterAttendance);
}

if (attendanceStatusFilter) {
  attendanceStatusFilter.addEventListener("change", filterAttendance);
}

if (attendanceResetButton) {
  attendanceResetButton.addEventListener("click", function () {
    if (attendanceSearchInput) {
      attendanceSearchInput.value = "";
    }

    if (attendanceDepartmentFilter) {
      attendanceDepartmentFilter.value = "";
    }

    if (attendanceStatusFilter) {
      attendanceStatusFilter.value = "";
    }

    loadAttendance();
  });
}

// ======================================================
// DATE
// ======================================================

const currentDate = document.getElementById("currentDate");

if (currentDate) {
  currentDate.textContent = new Date().toLocaleDateString();
}

// ======================================================
// INITIAL LOAD
// ======================================================

if (attendanceTable) {
  loadAttendance();
}

// ======================================================
// GLOBAL API
// ======================================================

window.getAttendanceData = getAttendanceData;

window.getEmployeeAttendance = getEmployeeAttendance;

window.getEmployeeAttendanceStatus = getEmployeeAttendanceStatus;

window.getAttendanceSummary = getAttendanceSummary;

window.markEmployeeAttendance = markEmployeeAttendance;

window.resetEmployeeAttendance = resetEmployeeAttendance;

window.saveAttendance = saveAttendance;

window.loadAttendance = loadAttendance;
