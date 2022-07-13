/*//stockage
localStorage.setItem();

//Recupération donnée
localStorage.getItem();

//suppression
localStorage.removeItem();*/


function saveBasket(basket){
    localStorage.setItem("basket", basket);
}

function getBasket() {
    return localStorage.getItem("basket");
}

function addCart(product){
    let basket = getBasket();
    basket.push(product);
}
