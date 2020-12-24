//recuperation de l'id dans l'URL
let params = new URLSearchParams(document.location.search);
let idCameras = params.get("id")
console.log(idCameras);

//recuperation des element html
const title = document.getElementById("title");
const img = document.getElementById("img");
const description = document.getElementById("description");
const lenses = document.getElementById("lenses-select");
const price = document.getElementById("price");
const order = document.getElementById("basket");

//recuperation des donnees backend et ajout dans le html
let cam
fetch("http://localhost:3000/api/cameras/" + idCameras)
    .then(res => res.json())
    .then(res => {
        cam=res;
        title.innerHTML += cam.name;
        description.innerHTML += cam.description;
        price.innerHTML +="Prix : "+ cam.price + " €";
        img.setAttribute("src", cam.imageUrl);
        img.setAttribute("alt", cam.name);
        for (lense of cam.lenses){
            lenses.innerHTML += `<option value:${lense}>${lense}</option> `
        }
        console.log(cam);
    })
    .catch(error => console.error(error));

