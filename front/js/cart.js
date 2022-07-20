let addProduit = JSON.parse(localStorage.getItem("productBasket"));

const panierDisplay = async () =>{
    console.log('salut');
    if(addProduit){
        await addProduit;
        console.log(addProduit);



/*<section id="cart__items">
<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
   <div class="cart__item__img">
     <img src="../images/product01.jpg" alt="Photographie d'un canapé">
   </div>
   <div class="cart__item__content">
     <div class="cart__item__content__description">
       <h2>Nom du produit</h2>
       <p>Vert</p>
       <p>42,00 €</p>
     </div>
     <div class="cart__item__content__settings">
       <div class="cart__item__content__settings__quantity">
         <p>Qté : </p>
         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
       </div>
       <div class="cart__item__content__settings__delete">
         <p class="deleteItem">Supprimer</p>
       </div>
     </div>
   </div>
 </article> -->
</section>*/
                /*____IMAGE + ALT____*/
        let img = document.querySelector("cart__item__img");
        img.innerHTML = `<img src="${produitTableau[i].imageUrl}">`;

    }

    
}

panierDisplay();