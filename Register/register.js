function showExtraField() {
    var userType = document.getElementById('user-type').value;
    var coachField = document.getElementById('coach-field');

    if (userType === 'coach') {
        coachField.style.display = 'block';
    } else {
        coachField.style.display = 'none';
    }
}