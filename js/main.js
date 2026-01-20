document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tasksBtn").addEventListener("click", loadTasks);
  document.getElementById("dashboardBtn").addEventListener("click", loadDashboard);

  loadTasks();
});
