let someProduct = [];

let addProduit = JSON.parse(localStorage.getItem("basketProduct"));

const panierDisplay = async () => {
    console.log("Salut");
    if(addProduit) {
        await addProduit;
        console.log(addProduit);

        cart__items.innerHTML = addProduit.map((basketProduct) => `
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
        `,
        );

        removeProduct();
        return;
        
    } else {

    }
};

panierDisplay();


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
