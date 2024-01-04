// Variables to keep track of quiz state
var questionsIndex = 0;
var time = 0;
var timerid = 0;

// DOM elements
var startbtn = document.getElementById("start-btn");
var questionArea = document.getElementById("question-area");
var quizstart = document.getElementById("quiz-start");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("answers");
var timer = document.getElementById("time");
var feedback = document.getElementById("feedback-1");
var feedback1 = document.getElementById("feedback");
var quizendb1 = document.getElementById("quiz-end");
var userid = document.getElementById("user-name");
var submitBtn = document.getElementById("submit");
var fanilscore = document.getElementById("Final-score");

// Function to initialize the quiz
function startbtnquiz() {
    startbtn.addEventListener("click", function () {
        // Show question area and hide quiz start section
        questionArea.classList.remove("hide");
        quizstart.classList.add("hide");
        initializeQuiz();
    });
}

// Function to initialize the quiz settings
function initializeQuiz() {
    // Calculate total time for the quiz
    time = questions.length * 20;

    // Start the timer
    timerid = setInterval(clock, 1000);

    // Load the first question
    getquestions();
}

// Function to load a question
function getquestions() {
    var currentquestion = questions[questionsIndex];
    questionTitle.textContent = currentquestion.title;

    choices.innerHTML = '';
    for (var i = 0; i < currentquestion.answer.length; i++) {
        var choice = currentquestion.answer[i];
        var choicebtn = document.createElement('button');
        choicebtn.setAttribute('class', 'choice');
        choicebtn.setAttribute('value', choice);
        choicebtn.textContent = i + 1 + '-' + choice;
        choices.appendChild(choicebtn);
    }
}

// Function to check the selected answer
function checkanswer(event) {
    var ansbutton = event.target;

    if (!ansbutton.matches('.choice')) {
        return;
    }
    if (ansbutton.value !== questions[questionsIndex].correct) {
        // Deduct time for wrong answer
        time -= 20;
        if (time < 0) {
            time = 0;
        }
        timer.textContent = time;

        feedback.textContent = 'WRONG!';
    } else {
        feedback.textContent = 'CORRECT!';
    }
    feedback1.classList.remove('hide');

    // Move to the next question or end the quiz
    questionsIndex++;
    if (time <= 0 || questionsIndex === questions.length) {
        endquiz();
    } else {
        getquestions();
    }
}

// Function to end the quiz
function endquiz() {
    clearInterval(timerid);

    // Show the quiz end section and hide the question area
    quizendb1.classList.remove('hide');
    questionArea.classList.add("hide");
    fanilscore.textContent = time;
}

// Function to update the timer
function clock() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        endquiz();
    }
}

// Function to save the score and redirect to highscores.html
function savescore() {
    var user = userid.value.trim();

    if (user !== '') {
        // Retrieve or initialize the highscore array from Local Storage
        var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

        // Create a new score object
        var newScore = {
            score: time,
            user: user
        };

        // Add the new score to the highscore array
        highscore.push(newScore);

        // Save the updated highscore array to Local Storage
        window.localStorage.setItem('highscore', JSON.stringify(highscore));

        // Redirect to highscores.html
        location.href = 'highscores.html';
    }
}

// Event listeners for submit button and choices
submitBtn.onclick = savescore;
choices.onclick = checkanswer;

// Call the function to initialize the quiz when the page loads
startbtnquiz();

