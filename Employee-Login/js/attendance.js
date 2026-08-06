"use strict";

// ================================
// VARIABLES
// ================================

let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

const attendanceTable = document.getElementById("attendanceTable");

const attendanceSearchInput = document.getElementById("searchInput");

const attendanceDepartmentFilter = document.getElementById("departmentFilter");

const attendanceStatusFilter = document.getElementById("statusFilter");

const resetButton = document.getElementById("resetBtn");

// ================================
// LOAD ATTENDANCE
// ================================

function loadAttendance(employeeList = employees) {
  attendanceTable.innerHTML = "";

  employeeList.forEach((employee) => {
    let record = attendanceData.find((item) => item.id === employee.id);

    let status = record ? record.status : "Not Marked";

    attendanceTable.innerHTML += `

<tr>


<td>
${employee.id}
</td>



<td>
${employee.name}
</td>



<td>
${employee.department}
</td>




<td>


<select id="attendance-${employee.id}">


<option value="Present">
Present
</option>


<option value="Absent">
Absent
</option>


<option value="Half Day">
Half Day
</option>


<option value="WFH">
Work From Home
</option>


</select>


</td>




<td>


<span class="badge ${getBadgeClass(status)}">

${status}

</span>


</td>




<td>


<button 
class="action-btn mark-btn"

onclick="markAttendance('${employee.id}')">

${record ? "Update" : "Mark"}

</button>




<button

class="action-btn reset-btn"

onclick="resetAttendance('${employee.id}')">

Reset

</button>


</td>


</tr>

`;
  });

  updateSummary();
}

loadAttendance();

// ================================
// MARK ATTENDANCE
// ================================

function markAttendance(id) {
  let select = document.getElementById("attendance-" + id);

  let status = select.value;

  let existing = attendanceData.find((item) => item.id === id);

  if (existing) {
    existing.status = status;
  } else {
    attendanceData.push({
      id: id,

      status: status,
    });
  }

  saveAttendance();

  loadAttendance();
}

// ================================
// RESET
// ================================

function resetAttendance(id) {
  attendanceData = attendanceData.filter((item) => item.id !== id);

  saveAttendance();

  loadAttendance();
}

// ================================
// SAVE
// ================================

function saveAttendance() {
  localStorage.setItem(
    "attendanceData",

    JSON.stringify(attendanceData),
  );
}

// ================================
// SUMMARY
// ================================

function updateSummary() {
  document.getElementById("totalEmployees").textContent = employees.length;

  document.getElementById("presentCount").textContent = countStatus("Present");

  document.getElementById("absentCount").textContent = countStatus("Absent");

  document.getElementById("halfDayCount").textContent = countStatus("Half Day");

  document.getElementById("wfhCount").textContent = countStatus("WFH");
}

function countStatus(status) {
  return attendanceData.filter((item) => item.status === status).length;
}

// ================================
// SEARCH FILTER
// ================================

function filterAttendance() {
  let search = attendanceSearchInput.value.toLowerCase().trim();

  let department = attendanceDepartmentFilter.value;

  let status = attendanceStatusFilter.value;

  let filteredEmployees = employees.filter((employee) => {
    let record = attendanceData.find((item) => item.id === employee.id);

    let employeeStatus = record ? record.status : "Not Marked";

    return (
      (employee.id.toLowerCase().includes(search) ||
        employee.name.toLowerCase().includes(search)) &&
      (department === "" || employee.department === department) &&
      (status === "" || employeeStatus === status)
    );
  });

  loadAttendance(filteredEmployees);
}

attendanceSearchInput.addEventListener("input", filterAttendance);

attendanceDepartmentFilter.addEventListener("change", filterAttendance);

attendanceStatusFilter.addEventListener("change", filterAttendance);

// ================================
// RESET FILTERS
// ================================

resetButton.addEventListener("click", () => {
  attendanceSearchInput.value = "";

  attendanceDepartmentFilter.value = "";

  attendanceStatusFilter.value = "";

  loadAttendance();
});

// ================================
// BADGES
// ================================

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

// ================================
// DATE
// ================================

document.getElementById("currentDate").textContent =
  new Date().toLocaleDateString();
