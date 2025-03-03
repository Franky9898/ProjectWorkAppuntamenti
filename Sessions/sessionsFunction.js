Container = document.getElementById("sessions-container");

function getQueryParam(id)
{
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    return params.get(id);
}

function loadSessionsOnload(e)
{
    let id = getQueryParam("id");
    e.preventDefault();
    fetch('http://localhost:8080/sessions/showSessionsByCourseId/' + id)
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);
            displaySessions(data);
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
}

document.addEventListener("DOMContentLoaded", loadSessionsOnload);

function loadSessions()
{
    const filters = getFilters();

    fetch('http://localhost:8080/sessions/showSessions')
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);

            const filteredSessions = data.filter(session =>
            {
                const coaches = session.users.filter(user => user.role === 'COACH');

                if (filters.selectedCoach && !coaches.some(coach => coach.lastName === filters.selectedCoach))
                {
                    return false;
                }

                if (filters.selectedHour && session.startingTime !== filters.selectedHour)
                {
                    return false;
                }

                return true;
            });

            console.log(filteredSessions);
            displaySessions(filteredSessions);
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
}

function loadAllSessions(e)
{
    e.preventDefault();
    fetch('http://localhost:8080/sessions/showSessions')
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);
            displaySessions(data);
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
}

function displaySessions(session)
{
    const sessionCard = session.map(session =>
    {
        return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <h5 class="card-header card-header-style">${session.startingTime}</h5>
                <div class="card-body card-body-style">
                    <h5 class="card-title">Course: ${session.title}</h5>
                    <p class="card-text">${session.description}</p>
                    <div class="card-footer-style">
                        <a onclick="addSessionToUser(${session.id})" id="prenota-btn" class="btn btn-primary card-btn-style">Prenota</a>
                        
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    Container.innerHTML = `<div class="row row-style">${sessionCard}</div>`;
}

/* <p class="card-text">Coach ~${coach.firstName} ${coach.lastName}</p> */

let allButton = document.getElementById("all-btn");
allButton.addEventListener("click", function (e)
{
    loadAllSessions(e);
});

function getFilters()
{
    const selectedCoach = document.getElementById("coachSelect").value;
    const selectedHour = document.getElementById("timeSlot").value;

    return { selectedCoach, selectedHour };
}




/*document.getElementById("classDate").addEventListener("change", loadCourses);*/
document.getElementById("timeSlot").addEventListener("change", loadSessions);
document.getElementById("coachSelect").addEventListener("change", loadSessions);

let prenotaButton = document.getElementById("prenota-btn");

function addSessionToUser(sessionId)
{
    let token = localStorage.getItem("authToken");
    fetch('http://localhost:8080/users/addUserSession/' + sessionId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
        .then(response => response.json())
        .then(data =>
        {
            console.log(data);
            window.alert("Sessione aggiunta con successo");
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
}


function toggleMenu()
{
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

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