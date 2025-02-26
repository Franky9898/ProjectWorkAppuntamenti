document.addEventListener('DOMContentLoaded', function () {
    // Recupera il parametro "attivita" dall'URL
    const urlParams = new URLSearchParams(window.location.search);
    const attivita = urlParams.get('attivita');

    // Dati fittizi per le attività
    const datiAttivita = {
        Pilates: {
            orario: "10:00 - 11:00",
            partecipanti: ["Mario Rossi", "Luigi Verdi", "Giulia Bianchi"]
        },
        Yoga: {
            orario: "09:00 - 10:00",
            partecipanti: ["Anna Gialli", "Paolo Neri"]
        },
        Zumba: {
            orario: "18:00 - 19:00",
            partecipanti: ["Laura Rossi", "Marco Blu"]
        },
        CrossFit: {
            orario: "07:00 - 08:00",
            partecipanti: ["Sara Viola", "Luca Arancione"]
        }
    };

    // Popola i dettagli dell'attività
    if (attivita && datiAttivita[attivita]) {
        document.getElementById('nomeAttivita').textContent = attivita;
        document.getElementById('orarioAttivita').textContent = datiAttivita[attivita].orario;

        const listaPartecipanti = document.getElementById('listaPartecipanti');
        datiAttivita[attivita].partecipanti.forEach(partecipante => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = partecipante;
            listaPartecipanti.appendChild(li);
        });
    } else {
        alert('Attività non trovata!');
        window.location.href = 'selezione-attivita.html'; // Reindirizza alla pagina di selezione
    }
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

function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}