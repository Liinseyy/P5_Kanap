//On récupère dans le LS la commande envoyée
const commandes = JSON.parse(localStorage.getItem("commandes"));
//Fonction async pour attendre la commande
const commandeDisplay = async () => {

// On attend commandes avant d'exécuter le reste
    if (commandes) {
await commandes;
                                // le -1 permet de récupérer le dernier élèment (l'index 1)
const lastCommande = commandes[commandes.length -1];
console.log(lastCommande);

//On cherche l'id orderId dans le HTML
const orderId = document.getElementById("orderId");
//On récupère dans la liste des éléments de la page cart, l'id de commande
orderId.innerHTML = lastCommande.order;
    }
}

commandeDisplay();