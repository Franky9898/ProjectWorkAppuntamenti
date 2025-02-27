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

document.addEventListener('DOMContentLoaded', function () 
{
    const logoutIcon = document.getElementById('logoutIcon');
    const token = localStorage.getItem('authToken');
    if (!token)
        return;
    if (logoutIcon)
    {
        logoutIcon.addEventListener('click', function ()
        {
            fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                // If you need to send data in the body:
                // body: JSON.stringify({ key: 'value' }),
            })
                .then(response =>
                {
                    if (response.ok)
                    {
                        console.log('Logout successful');
                        localStorage.clear();
                        window.location.href = '../Homepage/index.html';
                    } else
                    {
                        console.error('Logout failed:', response.status);
                    }
                })
                .catch(error =>
                {
                    console.error('Logout error:', error);
                });
        });
    } else
    {
        console.warn("Logout icon not found");
    }

});