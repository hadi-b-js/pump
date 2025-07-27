// Fetch and display expenses and shares from data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    displayExpenses(data.expenses);
    displayShares(data.expenses, data.shares);
  });

function displayExpenses(expenses) {
  const expensesTable = document.getElementById("expenses-table");
  expenses.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.Price.reduce((a, b) => a + b, 0).toLocaleString()}</td>
      <td>${item.invoice
        .map(
          (img) =>
            `<a href='img/${img}'><img src='img/${img}' class='invoice-img'/></a>`
        )
        .join(" ")}</td>
    `;
    expensesTable.appendChild(row);
  });
}

function displayShares(expenses, shares) {
  const total = expenses.reduce(
    (sum, e) => sum + e.Price.reduce((a, b) => a + b, 0),
    0
  );
  const sharesTable = document.getElementById("shares-table");
  const shareAmount = Math.round(total / shares.length);
  document.getElementById("unit-share").textContent =
    shareAmount.toLocaleString();
  shares.forEach((share) => {
    // Each gets equal share
    const paid = share.deposits.reduce((a, b) => a + b, 0);
    const due = shareAmount - paid;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${share.name}</td>
      <td>${share.floor + 1}</td>
      <td>${paid ? paid.toLocaleString() : "-"}</td>
      <td>${due > 0 ? due.toLocaleString() : "تسویه"}</td>
    `;
    sharesTable.appendChild(row);
  });
  document.getElementById("total-expense").textContent = total.toLocaleString();
}
