/************     Recuperation et chargement dans la page HTML      ************/
//recuperation de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idCameras = params.get("id");

//recuperation des elements html
const title = document.getElementById("title");
const img = document.getElementById("img");
const description = document.getElementById("description");
const lenses = document.getElementById("lenses-select");
const price = document.getElementById("price");
const order = document.getElementById("basket");
const titlePage = document.getElementById("titlePage");
const descPage = document.getElementById("descPage")

//recuperation des donnees backend et ajout dans le html
let cam;
fetch("https://orinoco-p5.herokuapp.com/api/cameras/" + idCameras)
    .then(res => res.json())
    .then(res => {
        cam=res;
        title.innerHTML += cam.name;
        description.innerHTML += cam.description;
        price.innerHTML +="Prix : "+ (cam.price/100).toLocaleString("fr") + ".00 €";
        img.setAttribute("src", cam.imageUrl);
        img.setAttribute("alt", cam.name);
        for (lense of cam.lenses){
            lenses.innerHTML += `<option value="${lense}">${lense}</option> `;
        }
        titlePage.innerHTML = cam.name;//titre page
        descPage.setAttribute("content", cam.description);//description de la page (meta)
    })
    .catch(error => console.error(error));
/*******************************************************/


/***************************     Ajout Panier      **********************************/
const btnAddBasket = document.getElementById("basket");

let optionLense = "none";
lenses.addEventListener("change", (event) =>{
    optionLense = event.target.value;
    console.log(optionLense);
});


const addLocalStorage = (data) => {
    if(localStorage.getItem("article" + 1) === null){
        localStorage.setItem ("article" + 1, data);
    }else{
        for (let i = 0; i< localStorage.length; i++){
            if (localStorage.getItem("article" + (i+2)) === null){
                localStorage.setItem ("article" + (i+2), data);
                break;
            }else{
                continue;
            }
        }
    } 
}

//ajout au panier si l'option a été definie
btnAddBasket.addEventListener("click", (e) =>{
    if (optionLense !== "none"){
        let data = {
            id : cam._id,
            name : cam.name,
            imageUrl : cam.imageUrl,
            price : cam.price,
            option : optionLense
        };
        //converti les donnees en JSON pour les stocker dans le localStorage
        addLocalStorage(JSON.stringify(data));
        alert("L'article a bien été ajouté.");
    }else {
        //alerte option non selectionnee
        alert("Veuillez selectionner une option pour l'ajouter au panier");
    }
});







