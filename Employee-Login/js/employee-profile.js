"use strict";

// ===============================
// SELECT EMPLOYEE
// ===============================

let employee = employees[0];

// You can later change this
// based on logged-in employee ID

// ===============================
// DISPLAY EMPLOYEE DETAILS
// ===============================

const employeeDetails = document.getElementById("employeeDetails");

employeeDetails.innerHTML = `


<div>
<strong>
Employee ID
</strong>

<br>

${employee.id}

</div>



<div>
<strong>
Name
</strong>

<br>

${employee.name}

</div>




<div>
<strong>
Department
</strong>

<br>

${employee.department}

</div>




<div>
<strong>
Designation
</strong>

<br>

${employee.designation}

</div>




<div>
<strong>
Email
</strong>

<br>

${employee.email}

</div>




<div>
<strong>
Phone Number
</strong>

<br>

${employee.phone || "N/A"}

</div>




<div>
<strong>
Joining Date
</strong>

<br>

${employee.joiningDate || "N/A"}

</div>




<div>
<strong>
Leave Balance
</strong>

<br>

${20 - getLeaveDays()}

</div>


`;

// ===============================
// ATTENDANCE REPORT
// ===============================

let employeeAttendance = attendanceData.filter(
  (attendance) => attendance.employeeId === employee.id,
);

let totalWorkingDays = employeeAttendance.length;

let presentDays = employeeAttendance.filter(
  (attendance) => attendance.status === "Present",
).length;

let leaveDays = getLeaveDays();

let percentage = 0;

if (totalWorkingDays > 0) {
  percentage = ((presentDays / totalWorkingDays) * 100).toFixed(2);
}

document.getElementById("workingDays").innerText = totalWorkingDays;

document.getElementById("presentDays").innerText = presentDays;

document.getElementById("leaveDays").innerText = leaveDays;

document.getElementById("attendancePercentage").innerText = percentage;

// ===============================
// LEAVE HISTORY
// ===============================

let leaveTable = document.getElementById("leaveHistory");

let employeeLeaves = leaveRequests.filter(
  (leave) => leave.employeeId === employee.id,
);

employeeLeaves.forEach((leave) => {
  leaveTable.innerHTML += `


<tr>


<td>
${leave.leaveType}
</td>


<td>
${leave.fromDate}
</td>


<td>
${leave.toDate}
</td>



<td>
${leave.totalDays}
</td>



<td>
${leave.status}
</td>



</tr>


`;
});

// ===============================
// FUNCTIONS
// ===============================

function getLeaveDays() {
  return leaveRequests

    .filter((leave) => leave.employeeId === employee.id)

    .reduce(
      (total, leave) => total + Number(leave.totalDays),

      0,
    );
}

function printProfile() {
  window.print();
}

function downloadProfile() {
  alert("Download feature UI only");
}
