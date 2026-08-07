"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // GET HTML ELEMENTS
  // ============================================

  const leaveTableBody = document.getElementById("leaveTableBody");

  const pendingCount = document.getElementById("pendingCount");

  const approvedCount = document.getElementById("approvedCount");

  const rejectedCount = document.getElementById("rejectedCount");

  const requestCount = document.getElementById("requestCount");

  // ============================================
  // SAFETY CHECK
  // ============================================

  if (!leaveTableBody) {
    console.error(
      "ERROR: #leaveTableBody was not found in leave-approval.html",
    );

    return;
  }

  // ============================================
  // RENDER LEAVE REQUESTS
  // ============================================

  function renderLeaveRequests() {
    leaveTableBody.innerHTML = "";

    if (!Array.isArray(leaveRequests) || leaveRequests.length === 0) {
      leaveTableBody.innerHTML = `

                <tr>

                    <td colspan="7" class="no-data">

                        No leave requests found.

                    </td>

                </tr>

            `;

      updateSummary();

      return;
    }

    leaveRequests.forEach(function (leave, index) {
      const row = document.createElement("tr");

      row.innerHTML = `

                <td>
                    ${leave.employeeId || "-"}
                </td>


                <td>
                    ${leave.employeeName || "-"}
                </td>


                <td>
                    ${leave.department || "-"}
                </td>


                <td>
                    ${leave.leaveType || "-"}
                </td>


                <td>
                    ${leave.totalDays || 0}
                </td>


                <td>

                    <span class="status-badge ${getStatusClass(leave.status)}">

                        ${leave.status || "Pending"}

                    </span>

                </td>


                <td class="action-buttons">

                    <button
                        class="approve-btn"
                        onclick="approveLeave(${index})"
                    >
                        Approve
                    </button>


                    <button
                        class="reject-btn"
                        onclick="rejectLeave(${index})"
                    >
                        Reject
                    </button>


                    <button
                        class="cancel-btn"
                        onclick="cancelLeave(${index})"
                    >
                        Cancel
                    </button>

                </td>

            `;

      leaveTableBody.appendChild(row);
    });

    updateSummary();
  }

  // ============================================
  // STATUS CLASS
  // ============================================

  function getStatusClass(status) {
    if (status === "Approved") {
      return "approved";
    }

    if (status === "Rejected") {
      return "rejected";
    }

    return "pending";
  }

  // ============================================
  // UPDATE SUMMARY
  // ============================================

  function updateSummary() {
    const pending = leaveRequests.filter(
      (leave) => leave.status === "Pending",
    ).length;

    const approved = leaveRequests.filter(
      (leave) => leave.status === "Approved",
    ).length;

    const rejected = leaveRequests.filter(
      (leave) => leave.status === "Rejected",
    ).length;

    pendingCount.innerText = pending;

    approvedCount.innerText = approved;

    rejectedCount.innerText = rejected;

    requestCount.innerText = `${leaveRequests.length} Requests`;
  }

  // ============================================
  // APPROVE
  // ============================================

  window.approveLeave = function (index) {
    if (!leaveRequests[index]) {
      return;
    }

    leaveRequests[index].status = "Approved";

    saveLeaves();

    renderLeaveRequests();
  };

  // ============================================
  // REJECT
  // ============================================

  window.rejectLeave = function (index) {
    if (!leaveRequests[index]) {
      return;
    }

    leaveRequests[index].status = "Rejected";

    saveLeaves();

    renderLeaveRequests();
  };

  // ============================================
  // CANCEL
  // ============================================

  window.cancelLeave = function (index) {
    if (!leaveRequests[index]) {
      return;
    }

    leaveRequests[index].status = "Cancelled";

    saveLeaves();

    renderLeaveRequests();
  };

  // ============================================
  // INITIAL RENDER
  // ============================================

  renderLeaveRequests();
});
