const Modal = {
    open(){
        //Abrir modal
        //Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active');
    },
    close(){
        //fechar o modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active');
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 400000,
        date: '24/01/2021'
    },
    {
        id: 3,
        description: 'Aluguel',
        amount: -150000,
        date: '26/01/2021'
    },

]

const Transaction = {
    /* 
        - pegar todas as transações
        - para cada transação, se ela for maior que zero
        - somar a uma variável e retornar a variável
    */
    incomes() {
        let income = 0;
        transactions.forEach(transaction => {
            if(transaction.amount > 0) {
                income = income + transaction.amount;
            }
        });

        return income;
    },
     /* 
        - pegar todas as transações
        - para cada transação, se ela for menor que zero
        - somar a uma variável e retornar a variável
    */
    expenses() {
        let expense = 0;
        transaction.forEach(transaction => {
            if(transaction.amount < 0) {
                expense = expense + transaction.amount;
            }
        });

        return expense;
    },
    //Total de entradas -  total de saídas
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

//Função para montar a tabela com os dados

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);

    },

    innerHTMLTransaction (transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html;
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    }

}

//Função para formatar o valor

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;

        //console.log(signal + value);
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction);
})

DOM.updateBalance();