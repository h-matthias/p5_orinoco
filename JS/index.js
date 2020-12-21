let cameras;
let len ="";

// fonction fetch pour recupere les donnés
fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .then(res => {
        let cam;
        for (cam of res){
            cameras = cam;
            console.log(cameras);
            let lense;
            let i=1;
            for (lense of cameras.lenses){
                if ( i != cameras.lenses.length){
                    len+= lense + " ou ";
                    i++
                } else{
                    len+= lense ;
                } 
            }
            creatArticle();//lance la fonction creation article
            len = "";//reinisialise la variable a vide
        }
    })
    .catch(error => console.log(error));

//fonction qui crée chaque article dans le HTML
function creatArticle(){
    const allArticle = document.getElementById("all-article");
    allArticle.innerHTML += `
        <a class="link-card card col-12 col-md-3 col-xl-2" href="produit.html?id=${cameras._id}">
            <h2>${cameras.name}</h2>
            <img class="img img-thumbnail" src="${cameras.imageUrl}" alt="${cameras.name}">
            <p class="description">${cameras.description}</p><hr>
            <p class="lenses">Option disponible : ${len}</p><hr>
            <p cass="price">Prix : ${cameras.price} €</p>
        </a>
    ` ;
}