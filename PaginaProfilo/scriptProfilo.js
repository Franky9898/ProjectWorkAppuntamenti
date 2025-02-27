//Funzione di switch del  bottone login/register al bottone Profilo
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if(token != null) {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }    
});

//funzione per far si che durante il rimpicciolimento dello schermo spunti un toggle per il menu header
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

deleteButton = document.getElementById("eliminaAccount");

deleteButton.addEventListener("click", deleteAccount);

function deleteAccount() {
    let token = localStorage.getItem("authToken");
    fetch('http://localhost:8080/users/deleteUser', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displaySessions(data);
        })
    .catch(error => console.error("Errore nel recupero dati:", error));
}