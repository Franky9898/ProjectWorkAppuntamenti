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
}document.addEventListener("DOMContentLoaded", function () 
{
    const token = localStorage.getItem("authToken");
    if (!token)
    {
        console.error("Nessun token trovato. L'utente potrebbe dover accedere.");
        return;
    }

    fetchUserDetails(token);
});

function fetchUserDetails(token) 
{
    fetch('http://localhost:8080/users/userDetails', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token 
        }
    })
        .then(response => response.json())
        .then(user =>
        {
            document.getElementById("firstName").value = user.firstName;
            document.getElementById("lastName").value = user.lastName;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
        })
        .catch(error =>
        {
            console.error("Errore nel recupero dettagli utente:", error);
        });
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