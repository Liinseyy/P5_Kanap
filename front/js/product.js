//Obtient l'url de la page product
function getURL(){
    return window.location.href;
}
//Obtient l'ID de l'article précis
function getProductId(){
    let url = new URL(getURL());
    let productId = url.searchParams.get("id");
    return productId;
}

let prod_id = getProductId();

let productData =[];    
    
const fetchProduct = async () => {
    fetch("http://localhost:3000/api/products/"+prod_id)  
    .then((res) => res.json())
    .then((promise) => {
        console.log(promise);
        productData = promise;
        //console.log(productData);
    });
    };

        let productDisplay = async () => {
        await fetchProduct();
        
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`;  

        let name = document.getElementById("title");
        name.innerHTML = productData.name;
    };

    productDisplay();


       