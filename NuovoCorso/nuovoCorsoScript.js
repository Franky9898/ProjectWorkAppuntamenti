document.addEventListener('DOMContentLoaded', function ()
{
    let form = document.getElementById('form');
    form.addEventListener('submit', function (event)
    {
        event.preventDefault();
        let title = document.getElementById('title').value.trim();
        let description = document.getElementById('description').value.trim();
        let courseData = {
            title: title,
            description: description
        };
        const token = localStorage.getItem('authToken');
        if (!token)
        {
            alert("Token non trovato. Effettua il login.");
            return;
        }
        fetch('http://localhost:8080/courses/addCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(courseData)
        })
            .then(function (response)
            {
                return response.text().then(function (text)
                {
                    if (response.ok)
                    {
                        alert("Corso creato con successo: " + text);
                        window.location.href='../PaginaProfilo/profiloIstruttore.html'
                    } else
                    {
                        alert("Errore: " + text);
                    }
                });
            })
            .catch(function (error)
            {
                console.error("Errore durante la creazione del corso:", error);
                alert("Si è verificato un errore nella creazione del corso.");
            });
    });
});

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