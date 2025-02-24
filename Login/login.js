const users = {
    base: { username: "user1", password: "password123" },
    instructor: { username: "instructor1", password: "nuovapassword" }
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const userType = document.getElementById("userType").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    document.getElementById("error-message").style.display = "none";

    if (userType === "base" && username === users.base.username && password === users.base.password) {
        alert("Login effettuato come Utente Base!");
        window.location.href = "../Homepage/index.html"; 
    } else if (userType === "instructor" && username === users.instructor.username && password === users.instructor.password) {
        alert("Login effettuato come Istruttore!");
        window.location.href = "../Home/instructor_home.html";
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});

function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if(loginButton && isLoggedIn === 'true') {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impedisce l'invio del form per ora

        // ... Logica di login ...

        // Se il login ha successo:
        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload(); // Ricarica la pagina per aggiornare il pulsante
    });
    
});