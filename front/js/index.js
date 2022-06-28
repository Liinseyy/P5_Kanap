//GET REQUEST
fetch('http://localhost:3000/api/products')
//then récupère le résultat de la requête res.ok vérifie si la requête se passe bien
    .then(function(res) {
     if (res.ok) {
          return res.json();
     }
    })
//je récupère la vraie valeur du .json 
    .then(function(value) {
        articleCreation(value);
     })
//en cas d'erreur, catch attrape l'erreur et me le signale avec le console.log 
    .catch(function(err) {
        console.log(err);
    });

//créer la liste de tous les produits grâce à cette boucle
function articleCreation(listProducts) {
    //console.log(listProducts)
    for (let i = 0; i < listProducts.length; i++){

//BALISES ARTICLES 
    const element = document.createElement('a');
    const article = document.createElement('article');
    const image = document.createElement('img');
    const titre = document.createElement('h3');
    const paragraphe = document.createElement('p');

//PLACE LES ELEMENTS DANS LE DOM

image.alt = listProducts[i].altTxt;
image.src = listProducts[i].imageUrl;
article.appendChild(image);

    titre.classList.add("productName");
    titre.innerHTML = listProducts[i].name;
    article.appendChild(titre);

        paragraphe.classList.add("productDescription");
        paragraphe.innerHTML = listProducts[i].description;
        article.appendChild(paragraphe);

            element.href = listProducts[i]._id;
            element.appendChild(article);

//VARIABLE POUR DEFINIR ELEMENT COMME ENFANT DE SECTION
    var section = document.getElementById('items');
    section.appendChild(element);
    }
        }
