function showExtraField() {
    var userType = document.getElementById('user-type').value;
    var coachField = document.getElementById('coach-field');

    if (userType === 'Coach') {
        coachField.style.display = 'block';
    } else {
        coachField.style.display = 'none';
    }
}

    // Funzione per aggiungere un nuovo utente (endpoint riservato all'admin)
    function addUser(newUser) {
        fetch('http://localhost:8080/users/addUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Non autorizzato o errore durante l\'aggiunta dell\'utente');
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta addUser:', data);
            //window.location.href="../Login/login.html";
            //printOutput(data);
        })
        .catch(error => {
            console.error('Errore nell\'aggiunta dell\'utente:', error);
            //printOutput({ error: error.message });
        });
      }

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let roleNumber;

    if(document.getElementById("user-type").value == "User"){
        roleNumber = 0;
        const newUser = {
            firstName: document.getElementById('name').value,
            lastName: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: roleNumber,
            secretCode: 0
        };
    console.log(newUser.role, newUser.name, newUser.surname, newUser.email, newUser.password);  
    addUser(newUser);
    } else{
        roleNumber = 1;
        const newUser = {
            firstName: document.getElementById('name').value,
            lastName: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: roleNumber,
            secretCode: document.getElementById('code-coach').value
        };
    console.log(newUser.role, newUser.name, newUser.surname, newUser.email, newUser.password);
    addUser(newUser);
    }
});