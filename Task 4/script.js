document.addEventListener('DOMContentLoaded', () => {
    const totalIncomeInput = document.getElementById('totalIncome');
    const setIncomeBtn = document.getElementById('setIncomeBtn');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const transactionList = document.getElementById('transactionList');
    const totalBalance = document.getElementById('totalBalance');

    let transactions = [];
    let totalIncome = 0;
    let balance = 0;

    setIncomeBtn.addEventListener('click', setIncome);
    addExpenseBtn.addEventListener('click', addExpense);

    function setIncome() {
        totalIncome = parseFloat(totalIncomeInput.value.trim());
        if (!isNaN(totalIncome) && totalIncome > 0) {
            balance = totalIncome;
            updateUI();
            totalIncomeInput.disabled = true;
            setIncomeBtn.disabled = true;
        }
    }

    function addExpense() {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if (description && !isNaN(amount) && amount > 0) {
            const expense = {
                description,
                amount
            };

            transactions.push(expense);
            balance -= amount;
            updateUI();
            clearInputs();
        }
    }

    function updateUI() {
        transactionList.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${transaction.description} - $${transaction.amount.toFixed(2)}
                <button onclick="removeTransaction(${index})">Remove</button>
            `;
            transactionList.appendChild(li);
        });
        totalBalance.textContent = balance.toFixed(2);
    }

    function clearInputs() {
        descriptionInput.value = '';
        amountInput.value = '';
    }

    window.removeTransaction = function (index) {
        const transaction = transactions[index];
        balance += transaction.amount;
        transactions.splice(index, 1);
        updateUI();
    }
});

