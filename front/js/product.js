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
        console.log(productData);

        //IMAGE + ALT
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`; 
        /////////////////
        //TITRE DU CANAPE
        let name = document.getElementById("title");
        name.innerHTML = productData.name;
        //////
        //PRIX
        let price = document.getElementById("price");
        price.innerHTML = productData.price;
        /////////////
        //DESCRIPTION
        let description = document.getElementById("description");
        description.innerHTML = productData.description;
        /////////////////////////
        //MENU DEROULANT COULEURS
        let select = document.getElementById("colors");
        //console.log(select);
        //console.log(productData.colors)

        productData.colors.forEach((color) => {
        //console.log(color);
        let tagOption = document.createElement("option");
        tagOption.innerHTML = `${color}`;
        tagOption.value = `${color}`;

        select.appendChild(tagOption);
        //console.log(tagOption);
        })
 });
   };

    fetchProduct();



