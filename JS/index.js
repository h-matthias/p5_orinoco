let cameras;
let len ="";

// fonction fetch pour recuperer les donnees
fetch("https://orinoco-p5.herokuapp.com/api/cameras")
    .then(res => res.json())
    .then(res => {
        let cam;
        for (cam of res){
            cameras = cam;
            let lense;
            let i=1;
            for (lense of cameras.lenses){
                if ( i != cameras.lenses.length){
                    len+= lense + " ou ";
                    i++;
                } else{
                    len+= lense ;
                } 
            }
            creatArticle();//lance la fonction creation article
            len = "";//reinitialise la variable a vide
        }
    })
    .catch(error => console.log(error));

//fonction qui creer chaque article dans le HTML
function creatArticle(){
    const allArticle = document.getElementById("all-article");
    allArticle.innerHTML += `
        <a class="link-card card col-12 col-md-3 col-xl-2" href="produit.html?id=${cameras._id}">
            <img class="card-img-top" src="${cameras.imageUrl}" alt="${cameras.name}">
            <div class="card-body">
                <h2 class="card-title">${cameras.name}</h2>
                <p class="description card-text">${cameras.description}</p>
                <p class="lenses">Option disponible : ${len}</p>
                <p class="price card-text">Prix : ${(cameras.price/100).toLocaleString("fr")}.00 €</p>
            </div>
            
        </a>
    ` ;
}

