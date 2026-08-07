"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("leaveTableBody");

  const pendingCount = document.getElementById("pendingCount");

  const approvedCount = document.getElementById("approvedCount");

  const rejectedCount = document.getElementById("rejectedCount");

  const requestCount = document.getElementById("requestCount");

  /*
        ====================================================
        RENDER
        ====================================================
        */

  function renderLeaveRequests() {
    tableBody.innerHTML = "";

    requestCount.textContent = `${leaveRequests.length} Request${leaveRequests.length === 1 ? "" : "s"}`;

    if (leaveRequests.length === 0) {
      tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="7"
                            class="empty-message"
                        >
                            No leave requests available.
                        </td>

                    </tr>

                `;

      updateSummary();

      return;
    }

    const sortedRequests = [...leaveRequests].sort(function (a, b) {
      return new Date(b.appliedOn) - new Date(a.appliedOn);
    });

    sortedRequests.forEach(function (leave) {
      const row = document.createElement("tr");

      row.innerHTML = `

                        <td>
                            ${escapeHTML(leave.employeeId)}
                        </td>

                        <td>
                            ${escapeHTML(leave.employeeName)}
                        </td>

                        <td>
                            ${escapeHTML(leave.department)}
                        </td>

                        <td>
                            ${escapeHTML(leave.leaveType)}
                        </td>

                        <td>
                            ${leave.totalDays}
                        </td>

                        <td>

                            <span class="status-badge ${getStatusClass(leave.status)}">

                                ${escapeHTML(leave.status)}

                            </span>

                        </td>

                        <td>

                            <div class="actions">

                                <button
                                    class="action-btn approve-btn"
                                    onclick="changeLeaveStatus('${leave.id}', 'Approved')"
                                    ${leave.status === "Approved" ? "disabled" : ""}
                                >
                                    Approve
                                </button>

                                <button
                                    class="action-btn reject-btn"
                                    onclick="changeLeaveStatus('${leave.id}', 'Rejected')"
                                    ${leave.status === "Rejected" ? "disabled" : ""}
                                >
                                    Reject
                                </button>

                                <button
                                    class="action-btn cancel-btn"
                                    onclick="changeLeaveStatus('${leave.id}', 'Cancelled')"
                                    ${leave.status === "Cancelled" ? "disabled" : ""}
                                >
                                    Cancel
                                </button>

                            </div>

                        </td>

                    `;

      tableBody.appendChild(row);
    });

    updateSummary();
  }

  /*
        ====================================================
        STATUS CLASS
        ====================================================
        */

  function getStatusClass(status) {
    switch (status) {
      case "Pending":
        return "pending";

      case "Approved":
        return "approved";

      case "Rejected":
        return "rejected";

      case "Cancelled":
        return "cancelled";

      default:
        return "";
    }
  }

  /*
        ====================================================
        UPDATE STATUS
        ====================================================
        */

  window.changeLeaveStatus = function (leaveId, status) {
    const success = updateLeaveStatus(leaveId, status);

    if (success) {
      renderLeaveRequests();
    }
  };

  /*
        ====================================================
        SUMMARY
        ====================================================
        */

  function updateSummary() {
    const counts = getLeaveCounts();

    pendingCount.textContent = counts.pending;

    approvedCount.textContent = counts.approved;

    rejectedCount.textContent = counts.rejected;
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

  renderLeaveRequests();
});
