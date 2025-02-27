document.addEventListener('DOMContentLoaded', function ()
{
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if (token)
    {
        fetch('http://localhost:8080/users/userRole', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response)
            {
                if (!response.ok)
                {
                    throw new Error('Errore nella richiesta al server');
                }
                return response.json();
            })
            .then(function (data)
            {
                if (data.role)
                {
                    loginButton.textContent = 'Profilo';
                    loginButton.href = (data.role === 'COACH') ? '../PaginaProfilo/profiloIstruttore.html' : '../PaginaProfilo/profiloUtente.html';
                }
            })
            .catch(function (error)
            {
                console.error("Errore nel recupero del ruolo utente:", error);
            });
    }
});