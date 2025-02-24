/*const users = {
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
});*/

// Funzione per effettuare il login
function login(username, password) {
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login fallito');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login effettuato:', data);
        printOutput(data);
        // Salva il token nel localStorage
        if(data.token) {
          localStorage.setItem("authToken", data.token);
          // Mostra il pulsante Logout e nasconde il form di login
          document.getElementById("logoutButton").style.display = "block";
          document.getElementById("loginForm").style.display = "none";
        }
    })
    .catch(error => {
        console.error('Errore nel login:', error);
        printOutput({ error: error.message });
    });
  }

  // Gestione del form di login
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
  });

  // Funzione per effettuare il logout
  function logout() {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Nessun token trovato nel localStorage");
      return;
    }
    
    fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Logout fallito');
        }
        return response.json();
    })
    .then(data => {
        console.log('Logout effettuato:', data);
        printOutput(data);
        // Rimuove il token dal localStorage
        localStorage.removeItem("authToken");
        // Nasconde il pulsante Logout e mostra il form di login
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    })
    .catch(error => {
        console.error('Errore durante il logout:', error);
        printOutput({ error: error.message });
    });
  }

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
        event.preventDefault();

        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload();
    });
    
});