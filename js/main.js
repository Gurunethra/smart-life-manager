document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tasksBtn").addEventListener("click", loadTasks);
  document.getElementById("dashboardBtn").addEventListener("click", loadDashboard);
  document.getElementById("weatherBtn").addEventListener("click", loadWeather);
  loadTasks();
});
