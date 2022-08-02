/*const str = window.location.href;   //Recup lien de la page
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

console.log(id);*/


const element = document.querySelector('#orderId');
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Fetch POST' })
};
fetch('http://localhost:3000/api/products', requestOptions)
    .then(response => response.json())
    .then(data => element.innerHTML = data._id );

    console.log(data);