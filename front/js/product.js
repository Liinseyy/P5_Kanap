const Product = window.location.search.split("?").join("");
// me retourne l'id de l'article sans le "?"
console.log(Product);

let productData =[];

const fetchProduct = async () => {
    fetch("http://localhost:3000/api/products/"+Product)  
    .then((res) => res.json())
    .then((promise) => {
        console.log(promise);
    });
};

fetchProduct();