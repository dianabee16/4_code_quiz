var contentEl = document.querySelector(".content");
var highscoreNav = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var optionsEl = document.querySelector(".options");
var resultEl = document.getElementById("result");
var scoreInputEl = document.getElementById("score-input");
var initialsInput = document.getElementById("initials");
var scoreListEl = document.getElementById("score-list");
var correctEl = document.getElementById("correct");
var finalScoreEl = document.getElementById("score");

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

        if (currentIndex >= questions.length) {
            clearInterval(timerInterval)
            gameOver()
        }

        if (timeLeft <= 0){
            timeLeft = 0;
            timerEl.textContent = "Time left: " + timeLeft + " s"
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
            finalScore +=25
            correctEl.textContent = "Correct!"
            finalScoreEl.textContent = finalScore

        } else {
            correctEl.textContent = "Incorrect!"
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
    questionsEl.style.display = "none";
    optionsEl.style.display = "none";
    scoreInputEl.style.display = "block";
}

function save(){
    var savedFromLocalStorage = JSON.parse(localStorage.getItem("saveFromLocalStorage")) || []
    var initialsValue = initialsInput.value.trim()
    var userData = {
        initialsValue: initialsValue,
        finalScore: finalScore
    }
    savedFromLocalStorage.push(userData)
    
        localStorage.setItem("savedFromLocalStorage", JSON.stringify(savedFromLocalStorage));
        initialsInput.value = "";
        var notification = document.createElement("p")
        notification.textContent = "Initials have been saved"
        scoreInputEl.append(notification)
        var notificationEnd = setTimeout(function (){
            notification.classList.add("hide")
        },1000)
        clearTimeout(notificationEnd)
        renderList();
}


submitButton.addEventListener("click", function(event){
    event.preventDefault()
    save()
});

function renderList(){
    // var inputs = JSON.parse(localStorage.getItem("userData"));
    console.log("here")
    var userScores = JSON.parse(localStorage.getItem("savedFromLocalStorage")) || []
    for (var i = 0; i < userScores.length; i++){
        var scoreData = document.createElement("li")
        scoreData.textContent = userScores[i].initialsValue + ":" + userScores[i].finalScore;
        scoreListEl.append(scoreData) 
        scoreListEl.classList.remove("hide")
    }

}


// create an event listener for submit button
// in the function for the submit button create a variable that is an object
// that object will have 2 properties - 1st is initials and the value of initials will be the value of the input.
// the 2nd property will be the score and that value will be value of the final Score 
// save it in local storage (before save it parse out what is in local storage, then add the object created above to the scores list, then save it to local storage)
 













// function showScores(){
//     var score = 0;
//     for (let i = 0; i < questions.length; i++) {
//         if (userAnswers[i] === questions[i].answer) {
//             score++;
//         }
//     }
//     resultEl.style.display = "none";
//     resultEl.textContent = `Your score is:${score}/${questions.length}`;

//     resultEl.style.display = "block;"
// }






// Event listeners
startButton.addEventListener("click", startQuiz)
// submitButton.addEventListener("click", submitInitials)
// goBackButton.addEventListener("click", goBack)
// clearHighscoresButton.addEventListener("click", clearHighscores)

