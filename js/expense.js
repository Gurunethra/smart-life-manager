let expenses = JSON.parse(localStorage.getItem("slm_expenses")) || [];

function loadExpenseTracker() {
  const app = document.getElementById("app-content");

  app.innerHTML = `
    <h2>EXPENSE TRACKER</h2>

    <div class="expense-form">
      <input type="text" id="expense-title" placeholder="Expense title">
      <input type="number" id="expense-amount" placeholder="Amount">
      <select id="expense-category">
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <input type="date" id="expense-date">
      <button id="addExpenseBtn">Add Expense</button>
    </div>

    <h3>Total Expense: <span id="total-expense">Rs.0</span></h3>

    <div id="expense-list"></div>
  `;

  document
    .getElementById("addExpenseBtn")
    .addEventListener("click", addExpense);

  renderExpenses();
  updateTotalExpense();
}

function addExpense() {
  const title = document.getElementById("expense-title").value.trim();
  const amount = Number(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;
  const date = document.getElementById("expense-date").value;

  if (!title || amount <= 0 || !date) {
    alert("Please enter valid expense details");
    return;
  }

  expenses.push({
    id: Date.now(),
    title,
    amount,
    category,
    date
  });

  saveExpenses();
  renderExpenses();
  updateTotalExpense();

  document.getElementById("expense-title").value = "";
  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-date").value = "";
}

function renderExpenses() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  if (expenses.length === 0) {
    list.innerHTML = "<p>No expenses added yet.</p>";
    return;
  }

  expenses.forEach(exp => {
    const div = document.createElement("div");
    div.className = "expense-item";

    div.innerHTML = `
      <span>${exp.title} - ₹${exp.amount} (${exp.category})</span>
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;

    list.appendChild(div);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
  updateTotalExpense();
}

function updateTotalExpense() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("total-expense").textContent = `₹${total}`;
}

function saveExpenses() {
  localStorage.setItem("slm_expenses", JSON.stringify(expenses));
}


window.ExpenseTracker = {
  getTotalExpense: () =>
    expenses.reduce((sum, e) => sum + e.amount, 0),

  getCategoryWiseExpense: () => {
    const summary = {};
    expenses.forEach(e => {
      summary[e.category] = (summary[e.category] || 0) + e.amount;
    });
    return summary;
  }
};