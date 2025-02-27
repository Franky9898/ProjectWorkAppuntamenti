function toggleMenu()
{
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}


//Funzione di switch del  bottone login/register al bottone Profilo
document.addEventListener('DOMContentLoaded', function ()
{
    const loginButton = document.getElementById('loginButton');
    const logoutIcon = document.getElementById('logoutIcon');
    const token = localStorage.getItem('authToken');

    if (token != null)
    {
        loginButton.textContent = 'Profilo';
        logoutIcon.style.display = 'block';
    }
});
