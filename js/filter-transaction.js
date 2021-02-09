var fieldFilter = document.querySelector("#filter-transaction");
fieldFilter.addEventListener("input", function(){
    var transactions = document.querySelectorAll("tbody tr");

    if(this.value.length > 0) {
        for(var i = 0; i < transactions.length; i++){
            var transaction = transactions[i];
            var tdDescription = transaction.querySelector(".description");
            var description = tdDescription.textContent;
            var expRegular = new RegExp(this.value, "i");
            if(!expRegular.test(description)) {
                transaction.classList.add("invisible");
            }else {
                transaction.classList.remove("invisible");
            }
        }
    }else {
        for(var i = 0; i < transactions.length; i++){
            var transaction = transactions[i];
            transaction.classList.remove("invisible");
        }
    }
    
});