/*fetch ('http://localhost:3000/api/products'), {
    method: "post",
    body: JSON.stringify(),
    headers : {
        "Content-Type": "application/json"
    },
}*/

const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;
