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
        const row = `
            <tr>
                <td>${prenotazione.id}</td>
                <td>${prenotazione.corso}</td>
                <td>${prenotazione.dataPrenotazione}</td>
                <td>${prenotazione.stato}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
});