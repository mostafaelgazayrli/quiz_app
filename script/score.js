// Function to print highscores on the page
function printHighscores() {
    // Retrieve highscores from Local Storage or initialize an empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscore')) || [];

    // Iterate through highscores and create list items for each
    for (var i = 0; i < highscores.length; i += 1) {
        // Create a list item for each highscore
        var liTag = document.createElement('li');
        liTag.textContent = highscores[i].user + ' - ' + highscores[i].score;

        // Display on the page by appending to the ordered list with id 'highscores'
        var olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    }
}

// Function to clear highscores and reload the page
function clearHighscores() {
    // Remove 'highscore' item from Local Storage
    window.localStorage.removeItem('highscore');

    // Reload the page to reflect the removal of highscores
    window.location.reload();
}

// Function to start a new quiz by redirecting to 'index.html'
function newquiz() {
    // Redirect to the 'index.html' page
    window.location.href = 'index.html';
}

// Event listeners for buttons
document.getElementById("retake-quiz").onclick = newquiz;
document.getElementById('clear').onclick = clearHighscores;

// Run the printHighscores function when the page loads
printHighscores();
