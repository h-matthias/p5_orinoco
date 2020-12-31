/** Recuperation des element HTML **/
const articleBasket = document.getElementById("articleBasket");
const totalPrice = document.getElementById("totalPrice");
const inputName = document.getElementById("inputName");
const inputFirstname = document.getElementById("inputfirstname");
const inputAddress = document.getElementById("inputAddress");
const inputCity = document.getElementById("inputCity");
const inputEmail = document.getElementById("inputEmail");

let products =[];
function writeArticle(){
    let numberArticle = 1;
    let totalBasket = 0;
    console.log(localStorage);
    for (let i = 0; i<= localStorage.length; i++){
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
            console.log("article "+ numberArticle + " nexiste pas")
            numberArticle++;
            
        }
    }
    totalPrice.innerHTML = (totalBasket/100).toLocaleString("fr") + ".00 €";
}
writeArticle();
console.log(products.length + " produit " + products )

const btnRemove = document.querySelectorAll("button[data-parent]");
console.log(btnRemove);

function removeItem(item){
    console.log(item.id)
    localStorage.removeItem(item.id);
        //articleBasket.innerHTML="";
        document.location.reload();
        //writeArticle();
}







//recupere les donner saisie de l'acheteur
let nameContact;
inputName.addEventListener("input",(e)=> nameContact = e.target.value);  
let firtnameContact;
inputName.addEventListener("input",(e)=> firstnameContact = e.target.value);
let addressContact;
inputName.addEventListener("input",(e)=> addressContact = e.target.value);
let cityContact;
inputName.addEventListener("input",(e)=> cityContact = e.target.value);
let emailContact;
inputName.addEventListener("input",(e)=> emailContact = e.target.value);


let contact;
function createContact() {
    
    contact = {
        name : nameContact,
        firstname: firtnameContact,
        address : addressContact,
        city : cityContact,
        email : emailContact
    }
}




