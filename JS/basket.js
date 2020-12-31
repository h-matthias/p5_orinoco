/** Recuperation des element HTML **/
const articleBasket = document.getElementById("articleBasket");
const totalPrice = document.getElementById("totalPrice");
const inputName = document.getElementById("inputName");
const inputFirstname = document.getElementById("inputFirstname");
const inputAddress = document.getElementById("inputAddress");
const inputCity = document.getElementById("inputCity");
const inputEmail = document.getElementById("inputEmail");

let products =[];
/**** creation des article dans le panier via le localStorage ****/
function writeArticle(){
    let numberArticle = 1;
    let totalBasket = 0;
    //console.log(localStorage);
    for (let i = 0; i<=100 /*localStorage.length*/; i++){
        //verifie si l'article existe dans le local storage
        if (localStorage.getItem("article"+ numberArticle)!==null){
            let value = JSON.parse(localStorage.getItem("article"+ numberArticle));
            articleBasket.innerHTML += `
                <div class="row d-md-flex" id="article${numberArticle}">
                    <div class="col-4">
                        <p>${value.name}</p>
                        <p>${value.option}</p>
                    </div>
                    <div class="col-3">${(value.price/100).toLocaleString("fr")}.00 €</div>
                    <div class="col-2">
                        <button class="delete btn border border-2 border-dark" onclick="removeItem(article${numberArticle})">
                            supprimer
                        </button>
                    </div>
                    <div class="col-3">${(value.price/100).toLocaleString("fr")}.00 €</div>
                </div>
                <hr>`;
            numberArticle++;
            totalBasket+= value.price;
            products.push(value.id);
        } else{
            numberArticle++;
        }
    }
    totalPrice.innerHTML = (totalBasket/100).toLocaleString("fr") + ".00 €";
};
writeArticle();
////console.log(products.length + " produit " + products )

const btnRemove = document.querySelectorAll("button[data-parent]");
//console.log(btnRemove);

/**** Supprime l'article au click du boutton supprime via la page panier.html *****/
function removeItem(item){
    //console.log(item.id)
    localStorage.removeItem(item.id);
        //recharge la page pour actualiser le panier le le total
        document.location.reload();
        
};







//recupere les donner saisie de l'acheteur
let nameContact;
inputName.addEventListener("input",(e)=> nameContact = e.target.value);  
let firstnameContact;
inputFirstname.addEventListener("input",(e)=> firstnameContact = e.target.value);
let addressContact;
inputAddress.addEventListener("input",(e)=> addressContact = e.target.value);
let cityContact;
inputCity.addEventListener("input",(e)=> cityContact = e.target.value);
let emailContact;
inputEmail.addEventListener("input",(e)=> emailContact = e.target.value);


let contact;
//cree le contact 
function createContact() {
    contact = {
        lastName : nameContact,
        firstName: firstnameContact,
        address : addressContact,
        city : cityContact,
        email : emailContact
    }
};

const btnOrder = document.getElementById("order");
btnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    sendOrder();
});



function sendOrder(){
    createContact();
    //console.log(contact);

    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST", 
        mode : "cors",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({contact, products})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
}

function saveResOrder(res){
    for (let response of res){
        localStorage.setItem("firstname", response.contact.firstName);
        console.log(localStorage.getItem("firstname"));
    }
}


