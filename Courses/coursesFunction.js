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

document.getElementById("coachSelect").addEventListener("change", loadCourses);


function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
}

/*document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if(token != null) {
        loginButton.textContent = 'Profilo';
        loginButton.href = '/profile.html';
    }    
});*/