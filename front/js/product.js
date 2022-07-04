const str = window.location;
const url = new URL(str);
//console.log(url); -> donne les infos url de la page selon l'id
const id = url.searchParams.get("id");
//console.log(id); -> attrape l'id de l'article
const host = "http://localhost:3000/api/products";
const objectURL = host + "api/products/" + id;
//console.log(objectURL); -> donne lien page product de l'article

let cardsFetch = function () {
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);


        // Image
        const img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        
        // Nom et titre
        const name = document.getElementById("title");
        name.innerHTML = data.name;
        const title = document.querySelector("title");
        title.innerHTML = data.name;
        // Prix
        const price = document.getElementById("price");
        price.innerHTML = `${data.price}`;
        // Description
        const description = document.getElementById("description");
        description.innerHTML = data.description;
        // Couleurs
        const color = document.getElementById("colors");
        for (i = 0; i < data.colors.length; i++) {
          color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      });
  };
  cardsFetch();
