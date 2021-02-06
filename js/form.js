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

const Storage = {
    localName: 'dev.finances:transactions',
    get() {
        return JSON.parse(localStorage.getItem("Storage.localName")) || 
        [];
    },

    set(transactions) {
        localStorage.setItem(Storage.localName, JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),
    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        App.reload();
    },

    /* 
        - pegar todas as transações
        - para cada transação, se ela for maior que zero
        - somar a uma variável e retornar a variável
    */
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
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
        Transaction.all.forEach(transaction => {
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

//Função para montar a tabela com os dados e formatando o balance

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr);

    },

    innerHTMLTransaction (transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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
    },

    clearTransctions() {
        DOM.transactionsContainer.innerHTML = "";
    }

}

//Função para formatar o valor

const Utils = {
    formatAmount(value) {
        value = value * 100;
        return Math.round(value);
    },

    formatDate(date) {
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

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

        /*
            - Verificar se todos os campos foram preenchidos
            - formatar os dados para salvar
            - salvar
            - apagar os dados do formulário
            - modal feche
            - atualizar a aplicação
        */

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues();
        
        if(description.trim() === "" || amount === "" || date === ""){
            throw new Error("Por favor, preencha todos os campos!")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return { 
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction);
    },

    clearFields() {
      Form.description.value = "";
      Form.amount.value = "";
      Form.date.value = "";  
    },

    submit(event) {
        event.preventDefault();
        
        try {
            Form.validateFields();

            const transaction = Form.formatValues();

            Form.saveTransaction(transaction);

            Form.clearFields();

            Modal.close();

            //Form.formatData();
            
        } catch (error) {
            alert(error.message);
        }

       

    }
}

const App = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index);
        });
        
        DOM.updateBalance();

        Storage.set(Transaction.all);
    },
    reload() {
        DOM.clearTransctions();
        App.init();
    },
}

App.init();
