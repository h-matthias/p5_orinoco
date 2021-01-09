const firstName = document.getElementById("firstName");
const idOrder = document.getElementById("idOrder");
const totalPrice = document.getElementById("totalPrice");

const fName = localStorage.getItem("firstname");
const idO =  localStorage.getItem("orderId");
const total = localStorage.getItem("totalPrice");

firstName.innerHTML = fName;
idOrder.innerHTML = `" ${idO} "`;
totalPrice.innerHTML = (total/100).toLocaleString("fr") + ".00 €";


/*****
 * Liberation des informations de confirmation
 * dans le localStorage 
 * ****/
    localStorage.removeItem("firstname");
    localStorage.removeItem("orderId");
    localStorage.removeItem("totalPrice");





