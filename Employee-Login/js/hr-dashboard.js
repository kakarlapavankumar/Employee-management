"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /*
        ====================================================
        GET ELEMENTS
        ====================================================
        */

  const totalEmployees = document.getElementById("totalEmployees");

  const presentToday = document.getElementById("presentToday");

  const employeesOnLeave = document.getElementById("employeesOnLeave");

  const pendingLeaves = document.getElementById("pendingLeaves");

  const departmentCount = document.getElementById("departmentCount");

  const activeEmployees = document.getElementById("activeEmployees");

  const activityTableBody = document.getElementById("activityTableBody");

  /*
        ====================================================
        UPDATE STATISTICS
        ====================================================
        */

  function updateDashboardStats() {
    /*
            --------------------------------------------
            EMPLOYEES
            --------------------------------------------
            */

    const total = employees.length;

    const active = employees.filter(
      (employee) => employee.status === "Active",
    ).length;

    const departments = new Set(
      employees.map((employee) => employee.department),
    ).size;

    totalEmployees.textContent = total;

    activeEmployees.textContent = active;

    departmentCount.textContent = departments;

    /*
            --------------------------------------------
            ATTENDANCE
            --------------------------------------------
            */

    let present = 0;

    if (typeof getAttendanceSummary === "function") {
      const summary = getAttendanceSummary();

      present = summary.present;
    }

    presentToday.textContent = present;

    /*
            --------------------------------------------
            LEAVE
            --------------------------------------------
            */

    const leaveCounts = getLeaveCounts();

    pendingLeaves.textContent = leaveCounts.pending;

    const currentLeaves = getEmployeesCurrentlyOnLeave();

    employeesOnLeave.textContent = new Set(
      currentLeaves.map((leave) => leave.employeeId),
    ).size;
  }

  /*
        ====================================================
        RECENT ACTIVITIES
        ====================================================
        */

  function renderRecentActivities() {
    const activities = [];

    /*
            --------------------------------------------
            RECENT EMPLOYEES
            --------------------------------------------
            */

    employees
      .slice(-5)
      .reverse()
      .forEach(function (employee) {
        activities.push({
          type: "Employee Added",

          employee: employee.name,

          date: employee.joiningDate,

          status: employee.status,
        });
      });

    /*
            --------------------------------------------
            RECENT LEAVE REQUESTS
            --------------------------------------------
            */

    [...leaveRequests]
      .sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))
      .slice(0, 5)
      .forEach(function (leave) {
        activities.push({
          type: "Leave Request",

          employee: leave.employeeName,

          date: formatDate(leave.appliedOn),

          status: leave.status,
        });
      });

    /*
            --------------------------------------------
            ATTENDANCE
            --------------------------------------------
            */

    if (typeof getAttendanceData === "function") {
      const attendance = getAttendanceData();

      attendance.forEach(function (record) {
        const employee =
          typeof getEmployeeById === "function"
            ? getEmployeeById(record.id)
            : null;

        if (!employee) {
          return;
        }

        activities.push({
          type: "Attendance Update",

          employee: employee.name,

          date: formatDate(new Date()),

          status: record.status,
        });
      });
    }

    /*
            --------------------------------------------
            SORT
            --------------------------------------------
            */

    activities.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    /*
            --------------------------------------------
            DISPLAY
            --------------------------------------------
            */

    activityTableBody.innerHTML = "";

    if (activities.length === 0) {
      activityTableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="4"
                            class="empty"
                        >
                            No recent activities.
                        </td>

                    </tr>

                `;

      return;
    }

    activities.slice(0, 10).forEach(function (activity) {
      const row = document.createElement("tr");

      row.innerHTML = `

                            <td>
                                ${escapeHTML(activity.type)}
                            </td>

                            <td>
                                ${escapeHTML(activity.employee)}
                            </td>

                            <td>
                                ${escapeHTML(activity.date)}
                            </td>

                            <td>

                                <span class="activity-status">

                                    ${escapeHTML(activity.status)}

                                </span>

                            </td>

                        `;

      activityTableBody.appendChild(row);
    });
  }

  /*
        ====================================================
        DATE FORMAT
        ====================================================
        */

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-IN");
  }

  /*
        ====================================================
        ESCAPE HTML
        ====================================================
        */

  function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent = value == null ? "" : value;

    return div.innerHTML;
  }

  /*
        ====================================================
        LOAD
        ====================================================
        */

  updateDashboardStats();

  renderRecentActivities();
});
