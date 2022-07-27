let someProduct = [];
let sommeProduits = [];
let addProduit = JSON.parse(localStorage.getItem("basketProduct"));

const panierDisplay = async () => {
    console.log("Salut");
    if(addProduit) {
      const cartItem = document.querySelector("#cart__items");
        cartItem.innerHTML = addProduit.map((basketProduct) => `
            <article class="cart__item" data-id="${basketProduct._id}" data-color="${basketProduct.couleur}">
                <div class="cart__item__img">
                  <img src="${basketProduct.imageUrl}" alt="Photographie d'un canapé ${basketProduct.name}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${basketProduct.name}</h2>

                    <p>Couleur : ${basketProduct.couleur}</p>
                    <p>Prix : ${basketProduct.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantité : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity"  min="1" max="100" value="${basketProduct.quantite}" data-id="${basketProduct._id}" data-couleur="${basketProduct.couleur}" >
                    </div>
                    <div class="cart__item__content__settings__delete" >
                      <p class="deleteItem" data-id="${basketProduct._id}" data-couleur="${basketProduct.couleur}">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
        `
        );
        calculProduit();
        plusQuantite();
        removeProduct();
        return;
        
    } else {

    }
};
const plusQuantite = async (panierDisplay) => {
    await panierDisplay;
    let plus = document.querySelectorAll(".itemQuantity");
    console.log(plus);
    plus.forEach((kanapplus) => {
        kanapplus.addEventListener("change", () => {
            console.log(kanapplus);


            for(i=0; i< addProduit.length;i++){
              if ( 
                addProduit[i]._id == kanapplus.dataset.id &&
                addProduit[i].couleur == kanapplus.dataset.couleur
                )  {
                return (
                  addProduit[i].quantite = +kanapplus.value,
                    localStorage.setItem("basketProduct", JSON.stringify(addProduit)),
                    (document.querySelectorAll(".itemQuantity")[i].textContent = addProduit[i].quantite),
                    calculProduit()
                );
              }
            }
            
        });
    });
};

const removeProduct = async (panierDisplay) => {
    await panierDisplay;
    let corbeilles = document.querySelectorAll(".deleteItem");

    corbeilles.forEach((corbeille) => {
        corbeille.addEventListener("click", () => {
            console.log(corbeille);

            let totalAddProduitRemove = addProduit.length;

            console.log(totalAddProduitRemove);

            if(totalAddProduitRemove == 1) {
                return (localStorage.removeItem("basketProduct"),
                location.href = "cart.html"
                );
            } 
            else {
                someProduct = addProduit.filter((el) => {
                    if(corbeille.dataset.id != el._id || corbeille.dataset.couleur != el.couleur){
                        return true;
                    }
                });
                console.log(someProduct);
                localStorage.setItem("basketProduct", JSON.stringify(someProduct));
                location.href = "cart.html";
            }
        });
    });
    return;
};

const calculProduit = (panierDisplay,plusQuantite,removeProduct) => {

    console.log("test");

    let produitPrice = [];
    let quantiteTotalProduit = [];

    let newTableau = JSON.parse(localStorage.getItem("basketProduct"));

    newTableau.forEach((product) => {
        produitPrice.push(product.price.toString()/*.replace(/00/,"")*/ * product.quantite);
        quantiteTotalProduit.push(product.quantite);
    });

    totalQuantity.textContent = `${eval(quantiteTotalProduit.join("+"))}`;

    sommeProduits = eval(produitPrice.toString().replace(/,/g, "+"));
    console.log(sommeProduits);

    totalPrice.textContent = sommeProduits 
};
panierDisplay();

// FORMULAIRE

const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

let valuePrenom, valueNom , valueEmail , valueAdresse , valueVille;

prenom.addEventListener("input" , function (e) {
  console.log(prenom.value)
  valuePrenom;
    // Si le champs est vide
  if(e.target.value.length == 0){
    console.log("Vide");
    firstNameErrorMsg.innerHTML = "";
    valuePrenom = null;
    console.log(valuePrenom);   //Lettres seulement autorisés, entre 3 et 25 caractères
  }else if (e.target.value.length < 3 || e.target.value.length > 25){
    firstNameErrorMsg.innerHTML = "Ce champs doit contenir entre 3 et 25 caractères";
    valuePrenom = null;
    console.log("Non conforme");
  }   //Validation
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
    firstNameErrorMsg.innerHTML = "";
    valuePrenom = e.target.value;
    console.log("success");
    console.log(valuePrenom);
  }
});

nom.addEventListener("input" , function (e) {
  console.log(nom.value)
  valueNom;
  // Si le champs est vide
  if(e.target.value.length == 0){
    console.log("Vide");
    lastNameErrorMsg.innerHTML = "";
    valueNom = null;
    console.log(valueNom);   //Lettres seulement autorisés, entre 3 et 25 caractères
  }else if (e.target.value.length < 3 || e.target.value.length > 25){
    lastNameErrorMsg.innerHTML = "Ce champs doit contenir entre 3 et 25 caractères";
    valueNom = null;
    console.log("Non conforme");
  }   //Validation
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
    lastNameErrorMsg.innerHTML = "";
    valueNom = e.target.value;
    console.log("success");
    console.log(valueNom);
  }
});

adresse.addEventListener("input" , function (e) {
  console.log(adresse.value)
  valueAdresse;
  // Si le champs est vide
  if(e.target.value.length == 0){
    console.log("Vide");
    addressErrorMsg.innerHTML = "";
    valueAdresse = null;
    console.log(valueAdresse);   //Lettres seulement autorisés, entre 3 et 25 caractères
  }else if (e.target.value.length < 3 || e.target.value.length > 25){
    addressErrorMsg.innerHTML = "Ce champs doit contenir entre 3 et 50 caractères";
    valueAdresse = null;
    console.log("Non conforme");
  }   //Validation
  if (e.target.value.match(/^[0-9]{1,6} [a-z A-Z]{3,25}$/)){
    addressErrorMsg.innerHTML = "";
    valueAdresse = e.target.value;
    console.log("success");
    console.log(valueAdresse);
    //On refuse les caractères spéciaux
  }if (
    !e.target.value.match(/^[0-9]{1,6} [a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 50
  ) {
    addressErrorMsg.innerHTML = "Caractère spéciaux interdits";
    valueAdresse = null;
    console.log("Caractères spéciaux");
  }
});

ville.addEventListener("input" , function (e) {
  console.log(ville.value)
  valueVille;
  // Si le champs est vide
  if(e.target.value.length == 0){
    console.log("Vide");
    cityErrorMsg.innerHTML = "";
    valueVille = null;
    console.log(valueVille);   //Lettres seulement autorisés, entre 3 et 25 caractères
  }else if (e.target.value.length < 1 || e.target.value.length > 25){
    cityErrorMsg.innerHTML = "Ce champs doit contenir entre 1 et 25 caractères";
    valueVille = null;
    console.log("Non conforme");
  }   //Validation
  if (e.target.value.match(/^[a-z A-Z]{1,25}$/)){
    cityErrorMsg.innerHTML = "";
    valueVille = e.target.value;
    console.log("success");
    console.log(valueVille);
  }
});

email.addEventListener("input" , (e) => {
  if(e.target.value.length == 0){
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
    console.log(valueEmail);
  }                                 // w -> word (mot)
  else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))  {
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
    console.log(valueEmail);
  }
  // ! > différent                                            // et différent de 0
  if(!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !e.target.value.length == 0){
    emailErrorMsg.innerHTML = "Email incorrect";
    valueEmail = null;
  }
});
