document.addEventListener('DOMContentLoaded', function () {
    // Dati fittizi
    const datiFittizi = [
        { id: 1, corso: "Yoga", dataPrenotazione: "2023-10-01", stato: "Confermato" },
        { id: 2, corso: "Pilates", dataPrenotazione: "2023-10-05", stato: "Cancellato" },
        { id: 3, corso: "Zumba", dataPrenotazione: "2023-10-10", stato: "Confermato" },
        { id: 4, corso: "CrossFit", dataPrenotazione: "2023-10-15", stato: "In attesa" }
    ];

    // Riferimento al tbody della tabella
    const tbody = document.getElementById('storicoPrenotazioni');

    // Popola la tabella con i dati fittizi
    datiFittizi.forEach(prenotazione => {
        let classeStato = '';
        switch (prenotazione.stato.toLowerCase()) {
            case 'confermato':
                classeStato = 'stato-confermato';
                break;
            case 'cancellato':
                classeStato = 'stato-cancellato';
                break;
            case 'in attesa':
                classeStato = 'stato-in-attesa';
                break;
            default:
                classeStato = '';
        }

        const row = `
            <tr>
                <td>${prenotazione.id}</td>
                <td>${prenotazione.corso}</td>
                <td>${prenotazione.dataPrenotazione}</td>
                <td class="${classeStato}">${prenotazione.stato}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2" onclick="modificaPrenotazione(${prenotazione.id})">Modifica</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminaPrenotazione(${prenotazione.id})">Elimina</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
});

// Funzione per gestire la modifica di una prenotazione
function modificaPrenotazione(id) {
    alert(`Modifica prenotazione con ID: ${id}`);
    // Qui puoi aprire un modal o reindirizzare a una pagina di modifica
}

// Funzione per gestire l'eliminazione di una prenotazione
function eliminaPrenotazione(id) {
    const conferma = confirm(`Sei sicuro di voler eliminare la prenotazione con ID: ${id}?`);
    if (conferma) {
        alert(`Prenotazione con ID: ${id} eliminata (simulazione)`);
        // Qui puoi fare una chiamata API per eliminare la prenotazione
    }
}