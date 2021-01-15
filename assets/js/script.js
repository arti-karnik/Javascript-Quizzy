
var questionListEL = document.getElementById('questionlist');
var timeRemainingEL = document.getElementById('timeRemaining');
var startButton = document.getElementById('start');

var currentQuestion = 0;
var seconds= 100;
var timer;
var buzzSound;
var score = 0;

function showscore() {
    console.log("inn");
    alert("score "+ score);
}

var questionList = [
    {
        "question" : "Commonly used datatypes Donot include:",
        "choice": ["choice 11", "choice 12", "choice 13", "choice 14"],
        "correctAnswer": "1",
    },
    {
        "question" : "What is the HTML tag under which one can write the JavaScript code?",
        "choice": ["<javascript>", "<scripted>", "<script>", "<js>"],
        "correctAnswer": "3",
    },
    {
        "question" : " Which of the following is the correct syntax to display “message” in an alert box using JavaScript?",
        "choice": ["alertbox(“message”)", "msg(“message”)", "msgbox(“message”)", "alert(“message”)"],
        "correctAnswer": "4",
    }/*,
    {
        "question" : "Which of the following is not a reserved word in JavaScript?",
        "choice": ["interface", "throws", "program", "short"],
        "correctAnswer": "3",
    },
    {
        "question" : "What should appear at the very end of your JavaScript?",
        "choice": ["The </script>", "The <script>", "The END statement", "None of the above"],
        "correctAnswer": "1",
    },
    {
        "question" : "JavaScript entities start with _______ and end with _________.",
        "choice": ["Semicolon, colon", "Semicolon, Ampersand", "Ampersand, colon", " Ampersand, semicolon"],
        "correctAnswer": "4",
    },
    {
        "question" : "Which of the following best describes JavaScript?",
        "choice": ["a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language.", "an object-oriented scripting language."],
        "correctAnswer": "4",
    }*/
];
function init() {
    createQuestionElement();
    startTimer();
    startGame();
}
function gameOver() {
    clearInterval(timer);
    console.log("score: " + score);
    alert("score " + score);
    localStorage.setItem("score",score);
    window.location.href = "gameOver.html";
}
function startGame() {
    score = 0;
    buzzSound = new Audio('./assets/images/buzz.wav');
}
function startTimer() {
    if (timeRemainingEL) {
        timer = setInterval(function() {
            seconds -= 1;
            timeRemainingEL.innerHTML = seconds;
            if (seconds == 0) {
                gameOver();
            }
        }, 1000);
    }    
}
function getQuestionForId(id) {
    return questionList[currentQuestion].question;
}
function createQuestionElement() {
    if (questionListEL) {
        var questionTitle = document.createElement("p");
        questionTitle.setAttribute("id", "questionTitle");
        questionTitle.textContent = getQuestionForId(currentQuestion);
        questionListEL.append(questionTitle);
    
        for (var i=0; i<4; i++) {
            var choiceButton = document.createElement("Button");
            choiceButton.textContent = questionList[currentQuestion].choice[i];
            choiceButton.setAttribute("class", "choice-button");
            choiceButton.addEventListener("click", selectAnswer);
            choiceButton.value = i + 1;
            questionListEL.append(choiceButton);
        }
    }
}

function updateQuestion() {
    var questionTitleEl = document.getElementById('questionTitle');
    questionTitle.textContent = questionList[currentQuestion].question;

    var choiceButtons = document.querySelectorAll(".choice-button"); 
    
    for (var i=0; i<choiceButtons.length; i++) {
        choiceButtons[i].textContent = questionList[currentQuestion].choice[i];
    }
}
function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
        score = score + 10;
        console.log("score : " + score);

    } else {
        wrongAnswer();
    }
}
function selectAnswer() {
    checkAnswer(this.value, questionList[currentQuestion].correctAnswer);

    currentQuestion = currentQuestion + 1;
    if (currentQuestion < questionList.length) {
        updateQuestion();
    } else {
       gameOver();
    }
}

function wrongAnswer() {
    console.log(buzzSound);

    seconds = seconds - 5;
    buzzSound.play();

    if (seconds <= 0) {
        gameOver();
    }
}

init();