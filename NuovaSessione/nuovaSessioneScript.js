//Funzione di switch del  bottone login/register al bottone Profilo
document.addEventListener('DOMContentLoaded', function ()
{
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if (token != null)
    {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }
});
//funzione per far si che durante il rimpicciolimento dello schermo spunti un toggle per il menu header
function toggleMenu()
{
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function ()
{
    const token = localStorage.getItem("authToken");
    if (!token)
    {
        console.error("Nessun token trovato. L'utente potrebbe dover accedere.");
        return;
    }

    fetchCourses(token);
    fetchWeekDays(token);
    fetchRooms(token);

    const form = document.querySelector(".card-body form");

    form.addEventListener("submit", function (event)
    {
        event.preventDefault();

        const classCategory = document.getElementById("classCategory").value;
        const classDay = document.getElementById("classDay").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const roomSelect = document.getElementById("roomSelect").value;
        const maxParticipants = document.getElementById("maxParticipants").value;

        const sessionData = {
            startingTime: startTime,
            endingTime: endTime,
            maxParticipants: parseInt(maxParticipants),
            room: {
                id: roomSelect
            },
            course: {
                title: classCategory
            },
            sessionDay: {
                id: classDay
            }
        };

        // POST
        fetch('http://localhost:8080/sessions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(sessionData)
        })
            .then(function (response)
            {
                return response.text().then(function (resultText)
                {
                    if (response.ok)
                    {
                        alert("Sessione creata con successo!");
                        console.log("Success:", resultText);
                    } else
                    {
                        alert("Errore nella creazione della sessione: " + resultText);
                        console.error("Error:", resultText);
                    }
                });
            })
            .catch(function (error)
            {
                console.error("Errore nella richiesta:", error);
                alert("Errore nella richiesta: " + error.message);
            });
    });
});

function fetchCourses(token) 
{
    fetch('http://localhost:8080/courses/coachCourses', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(function (response)
        {
            return response.json();
        })
        .then(function (courses)
        {
            const courseSelect = document.getElementById("classCategory");
            courseSelect.innerHTML = '<option selected disabled>Scegli un corso...</option>';
            courses.forEach(function (course)
            {
                const option = document.createElement("option");
                option.value = course.title;
                option.text = course.title;
                courseSelect.appendChild(option);
            });
        })
        .catch(function (error)
        {
            console.error("Errore nel recupero dei corsi:", error);
        });
}

function fetchWeekDays(token)
{
    fetch('http://localhost:8080/courses/gymWeekDays', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(function (response)
        {
            return response.json();
        })
        .then(function (openDays)
        {
            const daySelect = document.getElementById("classDay");
            daySelect.innerHTML = '<option selected disabled>Scegli un giorno...</option>';
            openDays.forEach(function (weekday)
            {
                const option = document.createElement("option");
                option.value = weekday.id;
                option.text = weekday.day;
                daySelect.appendChild(option);
            });
        })
        .catch(function (error)
        {
            console.error("Errore nel recupero dei giorni di apertura:", error);
        });
}

function fetchRooms(token)
{
    fetch('http://localhost:8080/courses/gymRooms', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(function (response)
        {
            return response.json();
        })
        .then(function (rooms)
        {
            const roomSelect = document.getElementById("roomSelect");
            roomSelect.innerHTML = '<option selected disabled>Scegli una sala...</option>';
            rooms.forEach(function (room)
            {
                const option = document.createElement("option");
                option.value = room.id;
                option.text = "Sala " + room.id;
                roomSelect.appendChild(option);
            });
        })
        .catch(function (error)
        {
            console.error("Errore nel recupero delle sale:", error);
        });
}
