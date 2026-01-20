function loadDashboard() {
  const app = document.getElementById("app-content");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const totaltasks = tasks.length;
  const completedtasks = tasks.filter(t => t.completed).length;
  const pendingtasks = totaltasks - completedtasks;

  app.innerHTML = `
    <h2> DASHBOARD</h2>

    <div class="dashboard-grid">
      
      <div class="dashboardcard-total">
        <h3>TOTAL TASKS</h3>
        <p class="dashboard-value">${totaltasks}</p>
      </div>

      <div class="dashboardcard-completed">
        <h3>COMPLETED ONES</h3>
        <p class="dashboard-value">${completedtasks}</p>
      </div>

      <div class="dashboardcard-pending">
        <h3>PENDING ONES</h3>
        <p class="dashboard-value">${pendingtasks}</p>
      </div>

    </div>
  `;
}
