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
            console.log("Courses Response:", courses);
            
            const courseSelect = document.getElementById("courseList");
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

function fetchCoachesEmail(token) 
{
    fetch('http://localhost:8080/courses/coachInSameGym', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(function (response)
        {
            return response.json();
        })
        .then(function (coaches)
        {
            console.log("Coaches Response:", coaches); 

            const coachSelect = document.getElementById("coachEmail");
            coachSelect.innerHTML = '<option selected disabled>Scegli un coach...</option>';
            coaches.forEach(function (coach)
            {
                const option = document.createElement("option");
                option.value = coach.email;
                option.text = coach.email;
                coachSelect.appendChild(option);
            });
        })
        .catch(function (error)
        {
            console.error("Errore nel recupero dei corsi:", error);
        });
}

document.addEventListener("DOMContentLoaded", function ()
{
    const token = localStorage.getItem("authToken");
    if (!token)
    {
        alert("Token non disponibile. Effettua il login.");
        return;
    }
    fetchCourses(token);
    fetchCoachesEmail(token);

});

document.getElementById("confirmAddCoach").addEventListener("click", function ()
{
    const token = localStorage.getItem("authToken");
    if (!token)
    {
        alert("Token non disponibile. Effettua il login.");
        return;
    }
    const coachEmail = document.getElementById("coachEmail").value;
    const courseTitle = document.getElementById("courseList").value;

    if (!coachEmail || !courseTitle)
    {
        alert("Seleziona sia un coach che un corso.");
        return;
    }

    const payload = {
        email: coachEmail,
        title: courseTitle
    };

    fetch("http://localhost:8080/courses/addCoachToCourse", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.text())
        .then(result =>
        {
            alert(result);
        })
        .catch(error =>
        {
            console.error("Errore nella richiesta:", error);
        });
});

