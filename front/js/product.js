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

        /*____IMAGE + ALT____*/
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}">`; 
        
        /*____TITRE DU CANAPE____*/
        let name = document.getElementById("title");
        name.innerHTML = productData.name;
        
        /*____PRIX____*/
        let price = document.getElementById("price");
        price.innerHTML = productData.price;
        
        /*____DESCRIPTION____*/
        let description = document.getElementById("description");
        description.innerHTML = productData.description;


        /*____MENU DEROULANT COULEURS____*/
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

    function qtyValue() {
        let qty = document.getElementById("quantity");
        return qty.value;
      }
      
    function colorValue() {
        let color = document.getElementById("colors");
        return color.value;}

    function getProductId(){
      let url = new URL(getURL());
      let productId = url.searchParams.get("id");
      return productId; 
    }

      // Ajout au panier avec le bouton
      const toCartBtn = document.getElementById("addToCart");
  
      function buildProduct(productId, qty, color){
        return  {id : productId, qty : qty, color : color};
      }
      // Au clique du bouton
      toCartBtn.addEventListener("click", () => {
        let qty = parseInt(qtyValue());
        let color = colorValue();
        let productId = getProductId();


        /*______TABLEAU LOCALSTORAGE_____*/

          let tabLS = [];
          //clé product
          let basket = JSON.parse(localStorage.getItem("basketProduct") || '[]')
          if(basket.length >= 0){
          let basketTab = [buildProduct(productId, qty, color)]  
          localStorage.setItem("basketProduct", JSON.stringify(basketTab))
          
          }
          else{
          if(productId != basketTab.productId){ 
              buildProduct.qty++;
          }  

          }
          


      });

      


      /*toCartBtn.addEventListener("click", () => {
        window.location.href = "./cart.html";
      });*/

