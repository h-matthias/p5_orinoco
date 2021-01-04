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







/*******  recupere les donner saisie de l'acheteur et verifie ********/
let nameContact ="";
let isNameContactValid = false;
inputName.addEventListener("input",(e)=>{
    //isNameContactValid = istext(e.target.value);
    isNameContactValid = checkInput(e.target.value, inputName);
    if(isNameContactValid){
        nameContact = e.target.value;
    }
});

let firstnameContact ="";
let isFirstnameContactValid = false;
inputFirstname.addEventListener("input",(e)=> {
    isFirstnameContactValid = checkInput(e.target.value, inputFirstname);
    if(isFirstnameContactValid){
        firstnameContact = e.target.value;
    }
});
let addressContact ="";
let isAddressContactValid = false;
inputAddress.addEventListener("input",(e)=> {
    isAddressContactValid = checkInput(e.target.value, inputAddress);
    if(isAddressContactValid){
        addressContact = e.target.value;
    }
});

let cityContact ="";
let isCityContactValid = false;
inputCity.addEventListener("input",(e)=> {
    isCityContactValid = checkInput(e.target.value, inputCity);
    if(isCityContactValid){
        cityContact = e.target.value;
    }
});

let emailContact ="";
let isEmailContactValid = false;
inputEmail.addEventListener("input",(e)=> {
    isEmailContactValid = isEmail(e.target.value);
    if (isEmailContactValid) {
        inputEmail.classList.add("valide");
        inputEmail.classList.remove("notValide");
        emailContact = e.target.value;

    } else {
        inputEmail.classList.remove("valide");
        inputEmail.classList.add("notValide");
        emailContact = "";
    }
});

function checkInput (txt, input) {
    if(txt!=""){
        input.classList.add("valide");
        input.classList.remove("notValide");
        return true;
    }else{
        input.classList.remove("valide");
        input.classList.add("notValide");
        return false;
    }
};

function istext (text){
    return /[A-Za-z]{1,}/.test(text);
};
function isEmail (email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

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
};

function saveResOrder(res){
    for (let response of res){
        localStorage.setItem("firstname", response.contact.firstName);
        console.log(localStorage.getItem("firstname"));
    }
};



