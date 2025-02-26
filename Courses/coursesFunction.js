Container = document.getElementById("courses-container");

function loadCourses() {
    const filters = getFilters();
    
    fetch('http://localhost:8080/courses/showCourses')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            const filteredCourses = data.filter(course => {
                const coaches = course.users.filter(user => user.role === 'COACH');

                if (filters.selectedCoach && coaches.length > 0) {
                    coachFilter = coaches.some(coach => coach.lastName === filters.selectedCoach);
                }
                
                return coachFilter;
            });
            
            console.log(filteredCourses);
            displayCourses(filteredCourses);
        })
        .catch(error => console.error("Errore nel recupero dati:", error));
    }

function loadAllCourses(e) {
    e.preventDefault();   
    fetch('http://localhost:8080/courses/showCourses')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCourses(data);
        })
    .catch(error => console.error("Errore nel recupero dati:", error));
}

function displayCourses(course){
    const courseCard = course.map(course => {
    const coach = course.users.find(user => user.role === 'COACH');
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <h5 class="card-header card-header-style"></h5>
                <div class="card-body card-body-style">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <div class="card-footer-style">
                        <a href="../Sessions/Sessions.html?id=${course.id}" class="btn btn-primary card-btn-style">Visualizza</a>
                        <p class="card-text">Coach ~${coach.firstName} ${coach.lastName}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    Container.innerHTML = `<div class="row row-style">${courseCard}</div>`;
}

let allButton = document.getElementById("all-btn");
allButton.addEventListener("click", function(e){
    loadAllCourses(e);
});

function getFilters() {
    const selectedCoach = document.getElementById("coachSelect").value;
    
    return {selectedCoach};
}




/*document.getElementById("classDate").addEventListener("change", loadCourses);
document.getElementById("timeSlot").addEventListener("change", loadCourses);*/
document.getElementById("coachSelect").addEventListener("change", loadCourses);


function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}


/*function loadSessions() {
    fetch('http://localhost:8080/sessions/showSessions')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displaySessions(data);
        })
    .catch(error => console.error("Errore nel recupero dati:", error));
}

function displaySessions(session){
    const sessionCard = session.map(session => {
    const coach = session.users.find(user => user.role === 'COACH');
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <h5 class="card-header card-header-style"></h5>
                <div class="card-body card-body-style">
                    <h5 class="card-title">${session.title}</h5>
                    <p class="card-text">${session.description}</p>
                    <div class="card-footer-style">
                        <a href="#" class="btn btn-primary card-btn-style">Prenota</a>
                        <p class="card-text">Coach ~${coach.firstName} ${coach.lastName}'</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    Container.innerHTML = `<div class="row row-style">${sessionCard}</div>`;
}*/

/*let coursesButton = document.getElementById("courses-btn");
coursesButton.addEventListener("click", function(){
    loadAllCourses();
});

/*let sessionButton = document.getElementById("session-btn");
sessionButton.addEventListener("click", function(){
    loadSessions();
});*/