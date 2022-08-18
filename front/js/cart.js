let someProduct = [];
let calculProduits = [];
let addProduit = JSON.parse(localStorage.getItem("basketProduct"));
//On rappel l'API pour obtenir le prix
const fetchPrice = async () => {
  if(addProduit != null){
    let productsPrice = new Object();
    for(let i = 0; i < addProduit.length ; i++){
      await fetch(`http://localhost:3000/api/products/${addProduit[i]._id}`)
        .then((res) => res.json())
        .then((promise) => {

          productsPrice[addProduit[i]._id] = promise.price;
      });
    }    
    return productsPrice;
  }
};

// fetchPrice();

const panierDisplay = async () => {
    //console.log("testpanierDisplay");
    const resultPrices = await fetchPrice();
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
                    <p>Prix : ${resultPrices[basketProduct._id]} €</p>
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

          // MODIF ARTICLE
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

          // SUPPRESSION ARTICLE
const removeProduct = async (panierDisplay) => {
    await panierDisplay;
    let forDelete = document.querySelectorAll(".deleteItem");

    forDelete.forEach((btnDelete) => {
        btnDelete.addEventListener("click", () => {
            console.log(btnDelete);

            let totalAddProduitRemove = addProduit.length;

            console.log(totalAddProduitRemove);

            if(totalAddProduitRemove == 1) {
                return (localStorage.removeItem("basketProduct"),
                location.href = "cart.html"
                );
            } 
            else {
                              //On filtre le tableau addProduit, el = les éléments
                someProduct = addProduit.filter((el) => {
                 
                    //On récupère les données et on compare ce qu'il y a dans le tableau pour garder les éléments différents de l'article supprimé
                    if(btnDelete.dataset.id != el._id || btnDelete.dataset.couleur != el.couleur){
                        return true;
                    }
                });
                localStorage.setItem("basketProduct", JSON.stringify(someProduct));
                location.href = "cart.html";
            }
        });
    });
    return;
};

const calculProduit = async () => {
  const productsPrice = await fetchPrice();
    console.log(productsPrice);

    //Stock les prix
    let produitPrice = [];
    //Stock les quantités
    let quantiteTotalProduit = [];

    //Tableau pour le calcul
    let calculTableau = JSON.parse(localStorage.getItem("basketProduct"));

    calculTableau.forEach((product) => {
        //on push le tableau avec le prix * la quantité
        produitPrice.push(productsPrice * product.quantite);
        quantiteTotalProduit.push(product.quantite);
    });
                                  // eval évalue et affiche le nombres d'articles dans "Total (4 articles) : €"
    totalQuantity.textContent = `${eval(quantiteTotalProduit.join("+"))}`;
                    //replace = on retire les , avec // , g = général
    calculProduits = eval(produitPrice.toString().replace(/,/g, "+"));
    console.log(calculProduits);

    totalPrice.textContent = calculProduits;console.log(calculProduits);
};
panierDisplay();

                          // __________ > FORMULAIRE <  __________

  const prenom = document.getElementById("firstName");
  const nom = document.getElementById("lastName");
  const adresse = document.getElementById("address");
  const ville = document.getElementById("city");
  const email = document.getElementById("email");

    let valuePrenom, valueNom , valueEmail , valueAdresse , valueVille;

                          // __________ >PRENOM<  __________

    prenom.addEventListener("input" , function (e) {
      console.log(prenom.value)
      valuePrenom;
        // Si le champs est vide il me renvoi "null"
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
                          // __________ >NOM<  __________
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
                          // __________ >ADRESSE<  __________
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
                          // __________ >VILLE<  __________
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
                          // __________ >EMAIL<  __________ 
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

//Récupérer la class cart order form 
const contact = document.querySelectorAll('.cart__order__form');

contact.forEach(formulaireContact => {
  formulaireContact.addEventListener("submit" , (e) => {
    //stopper l'envoi des infos formulaire
    e.preventDefault();
    console.log("envoi stoppé");

    //Créer la commande finale avec les informations formulaire
    if(valuePrenom && valueNom && valueEmail && valueAdresse && valueVille) {
      console.log("envoi");
      const commandeFinale = JSON.parse(localStorage.getItem("basketProduct"));
      let commandeId = [];
      console.log(commandeFinale);
      console.log(commandeId);

      commandeFinale.forEach((commande) => {
        commandeId.push(commande._id);
      });
      console.log(commandeId);      

      let data = {
        contact:{
          firstName : valuePrenom,
          lastName : valueNom,
          address : valueAdresse,
          city : valueVille,
          email : valueEmail,
        },
        products : commandeId,
      };

      console.log(data);

      ///////////////////  FETCH POST  ///////////////////

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then((promise) => {
        let responseServeur = promise;
        console.log(responseServeur);
      });

    }
    else {
      alert("Vous avez une erreur dans votre formulaire");
    }
  })
});