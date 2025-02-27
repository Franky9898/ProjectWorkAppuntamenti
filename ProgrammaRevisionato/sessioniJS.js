document.addEventListener("DOMContentLoaded", () =>
{
    const token = localStorage.getItem('authToken');

    fetch('http://localhost:8080/courses/coachSessions', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error('Errore: ' + response.statusText);
            }
            return response.json();
        })
        .then(data =>
        {
            const container = document.getElementById('sessions-container');

            data.filter(session => session !== null).forEach(session => 
            {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';

                const card = document.createElement('div');
                card.className = 'card h-100';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Use the course title as the card title
                const title = document.createElement('h5');
                title.className = 'card-title';
                title.textContent = session.title;

                // Optionally include the session ID as well
                const sessionId = document.createElement('p');
                sessionId.className = 'card-text';
                sessionId.textContent = 'Lezione: ' + session.id;

                const room = document.createElement('p');
                room.className = 'card-text';
                room.textContent = 'Sala: ' + session.room;

                const startingTime = document.createElement('p');
                startingTime.className = 'card-text';
                startingTime.textContent = 'Ora di inizio: ' + session.startingTime;

                const endingTime = document.createElement('p');
                endingTime.className = 'card-text';
                endingTime.textContent = 'Ora di fine: ' + session.endingTime;

                const sessionDay = document.createElement('p');
                sessionDay.className = 'card-text';
                sessionDay.textContent = 'Giorno: ' + session.sessionDay;

                const participants = document.createElement('p');
                participants.className = 'card-text';
                participants.textContent = 'Partecipanti: ' + session.participants;

                cardBody.appendChild(title);
                cardBody.appendChild(sessionId);
                cardBody.appendChild(room);
                cardBody.appendChild(startingTime);
                cardBody.appendChild(endingTime);
                cardBody.appendChild(sessionDay);
                cardBody.appendChild(participants);

                card.appendChild(cardBody);
                col.appendChild(card);
                container.appendChild(col);
            });
        })
        .catch(error =>
        {
            console.error('Error fetching sessions:', error);
        });
});