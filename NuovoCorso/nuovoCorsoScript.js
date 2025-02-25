document.addEventListener('DOMContentLoaded', function ()
{
    let form = document.querySelector('.nuovoCorso form');
    form.addEventListener('submit', function (event)
    {
        event.preventDefault(); // Prevent the default form submission
        let title = document.getElementById('title').value.trim();
        let description = document.getElementById('description').value.trim();
        let courseData = {
            title: title,
            description: description
        };
        let token = localStorage.getItem('token');
        if (!token)
        {
            alert("Token non trovato. Effettua il login.");
            return;
        }
        fetch('/addCourse', {
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
