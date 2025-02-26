function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

//Funzione di switch del  bottone login/register al bottone Profilo
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if(token != null) {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }    

    // Inizializza la mappa
    const location = [41.9028, 12.4964]; // Coordinate di Roma
    const map = L.map('map').setView(location, 15);

    // Aggiungi il layer di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Aggiungi un marker
    L.marker(location).addTo(map)
        .bindPopup('Fitness Booking')
        .openPopup();
});

