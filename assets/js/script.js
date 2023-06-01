var contentEl = document.querySelector(".content");
var highscoreNav = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var optionsEl = document.querySelector(".options");
var resultEl = document.getElementById("result");
var scoreInputEl = document.getElementById("score-input");
var initialsInput = document.getElementById("initials");
var scoreListEl = document.getElementById("score-list");

// Buttons
var startButton = document.getElementById("startButton");
var submitButton = document.getElementById("submit");
var goBackButton = document.getElementById("goBack");
var clearHighscoresButton = document.getElementById("clearHighscores");

// Score and timer variables
var finalScore = 0;
var timeLeft = 60;
var questionCount = 25;      // ???
var timerInterval = "";
var currentIndex = 0;


// List of questions and options, including the correct answer. 
const questions = [
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        options: ["function()", "console.log()", ".setAttribute", "var"],
        answer: "console.log()",
        clickedAnswer: null,
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        options: ["convert()", "parse()", "stringify()", "None of the above"],
        answer: "stringify()",
        clickedAnswer: null,
    },
    {
        question: "How to stop an interval timer in Javascript?",
        options: ["clearInterval", "clearTimer", "intervalOver", "stopTimer"],
        answer: "clearInterval",
        clickedAnswer: null,
    },
    {
        question: "How do we write a comment in javascript?",
        options:  ["/**/", "$$", "#/", "//"],
        answer: "//",
        clickedAnswer: null,
    },
]

// Function for the timer
function startTimer() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time left: " + timeLeft + " s"

        if (timeLeft <= 0){
            clearInterval(timerInterval);
            timeLeft.textContent = "Time is up!";
            gameOver();
        } 
    },1000)
}
function startQuestions(questions){
    currentQuestion = `
    <p>${questions.question}</p>
    
    `;
questionsEl.innerHTML = currentQuestion
var currentAnswers = `
<button class="answerButton">${questions.options[0]}</button>
<button class="answerButton">${questions.options[1]}</button>
<button class="answerButton">${questions.options[2]}</button>
<button class="answerButton">${questions.options[3]}</button>
`
optionsEl.innerHTML = currentAnswers
}
document.addEventListener("click", function(event){
    if (event.target.classList.contains("answerButton")){
        questions[currentIndex].clickedAnswer = event.target.textContent
        if (questions[currentIndex].clickedAnswer == questions[currentIndex].answer){
            finalScore ++
            
        } else {
            timeLeft -= 10
            if(timeLeft <= 0){
                clearInterval(timerInterval)
                gameOver()
            }
        }
        nextQuestion()
    }
})
function nextQuestion(){
    currentIndex ++
    if (currentIndex === questions.length){
        gameOver()
    } else {
        startQuestions(questions[currentIndex])
    }
}

// Starting the quiz
function startQuiz() {
    startButton.style.display = "none";
    questionsEl.style.display = "block";
    contentEl.classList.add("hide");

    startTimer();
    startQuestions(questions[currentIndex]);
}
function gameOver(){
    clearInterval(timerInterval);
}







// Event listeners
startButton.addEventListener("click", startQuiz)
// submitButton.addEventListener("click", submitInitials)
// goBackButton.addEventListener("click", goBack)
// clearHighscoresButton.addEventListener("click", clearHighscores)

