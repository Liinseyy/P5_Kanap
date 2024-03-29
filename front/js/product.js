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
// id du produit
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
      document.title = productData.name;

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
    // QUANTITE
  function qtyValue() {
      let qty = document.getElementById("quantity");
      return qty.value;
    }
    // COULEUR
  function colorValue() {
      let color = document.getElementById("colors");
      return color.value;}

    const bouton = document.getElementById("addToCart");
    bouton.addEventListener("click", () => { 
      location.href = "./cart.html";
      let produitTableau = JSON.parse(localStorage.getItem("basketProduct"))
      let qty = parseInt(qtyValue());
      let color = colorValue();
      /*object.assign permet d'assigner et/ou d'ajouter quelque chose à un objet (couleur+quantite)*/
      const fusionproduitColor = Object.assign({} , productData, {
        couleur: color,
        quantite: qty,
      }); 
      //On retire le prix du localStorage pour la sécurité
      delete fusionproduitColor.price;       

      if(produitTableau == null) {
        produitTableau = []  /* si il n'y a rien dans le tableau, il renvoi quand même un tableau vide*/
        produitTableau.push(fusionproduitColor); 
        localStorage.setItem("basketProduct", JSON.stringify(produitTableau));
      }/* si on stock le produit sans info, il renvoi les infos de base (name, price, etc)*/

      else if (produitTableau != null) {
        /*boucle pour tourner dans le tableau, voir le nombre de produits (i = produit)*/
        for (i=0; i < produitTableau.length; i++){

          /*SI le produit dans tableau(i) est égal au produit affiché ET la couleur du produit tableau est égal à la couleur*/
          if(produitTableau[i]._id == productData._id && produitTableau[i].couleur == color){
            return(
              /*Ajouter nombre d'articles */
              produitTableau[i].quantite = produitTableau[i].quantite + qty,
              localStorage.setItem("basketProduct", JSON.stringify(produitTableau)),
              (produitTableau = JSON.parse(localStorage.getItem("basketProduct")))
            );
          }

        }
        for (i=0; i < produitTableau.length; i++){
          if(produitTableau[i]._id == productData._id && 
              produitTableau[i].couleur != color || 
              produitTableau[i]._id != productData._id
            ) {
            return(
              produitTableau.push(fusionproduitColor),
              localStorage.setItem("basketProduct", JSON.stringify(produitTableau)),
              (produitTableau = JSON.parse(localStorage.getItem("basketProduct")))
            );
          }

        }
      }
      return (produitTableau = JSON.parse(localStorage.getItem("basketProduct")));
    });
    