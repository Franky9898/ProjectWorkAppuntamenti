function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if(token != null) {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }    
});