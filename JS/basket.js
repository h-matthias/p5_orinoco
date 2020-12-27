
const articleBasket = document.getElementById("articleBasket");
const totalPrice = document.getElementById("totalPrice");

let numberArticle = 1;
let totalBasket = 0;
for (let i = 0; i< localStorage.length; i++){
    console.log(localStorage.length);
    if (localStorage.getItem("article"+ numberArticle)!==null){
        console.log(localStorage.getItem("article"+ numberArticle))
        let value = JSON.parse(localStorage.getItem("article"+ numberArticle));
        console.log(value.name);

        articleBasket.innerHTML += `
            <div class="row d-md-flex">
                <div class="col-2"><img class="img img-thumbnail" src="${value.imageUrl}" alt="${value.name}"></div>
                <div class="col-4">
                    <p>${value.name}</p>
                    <p>${value.option}</p>
                </div>
                <div class="col-2">${value.price} €</div>
                <div class="col-2"></div>
                <div class="col-2">${value.price} €</div>
                <p>salut</p>
            </div>
            <hr>`;
            numberArticle++;
            totalBasket+= value.price;
    }
}

totalPrice.innerHTML = totalBasket + " €";

