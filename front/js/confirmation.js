const element = document.querySelector('#ordreId');
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Fetch POST Request Example' })
};
fetch('http://localhost:3000/api/products/order', requestOptions)
    .then(response => response.json())
    .then(data => ordreId.innerHTML = data.id );

/*let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);
if (search_params.has('orderId')) {
    _id = search_params.get('orderId');
}
orderId.innerHTML = _id*/