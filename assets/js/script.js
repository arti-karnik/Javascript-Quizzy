
var questionListEL = document.getElementById('questionlist');
var timeRemainingEL = document.getElementById('timeRemaining');
var startButton = document.getElementById('start');
var resultEl = document.getElementById('result');
var answerEl = document.getElementById('answer');
var questionNo = document.getElementById('questionNo');

var currentQuestion = 0;
var seconds= 10;
var timer;
var buzzSound = new Audio('./assets/images/buzz.wav');
var score = 0;
var isCorrect = false;


var questionList = [
    {
        "question" : "Commonly used datatypes DONOT  include:",
        "choice": ["Strings", "Boolean", "Alert", "Numbers"],
        "correctAnswer": "1",
    },
    {
        "question" : "What is the HTML tag under which one can write the JavaScript code?",
        "choice": ["<javascript>", "<scripted>", "<script>", "<js>"],
        "correctAnswer": "2",
    },
    {
        "question" : " Which of the following is the correct syntax to display “message” in an alert box using JavaScript?",
        "choice": ["alertbox(“message”)", "msg(“message”)", "msgbox(“message”)", "alert(“message”)"],
        "correctAnswer": "3",
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
  //  startGame();
}
function createQuestionElement() {

    var questionTitle = getQuestionTitleElement(currentQuestion);
    questionListEL.appendChild(questionTitle);
    
     for (var i=0; i<4; i++) {

        var choiceButton = makeRadioButton(questionList[currentQuestion].choice[i],i);
        questionListEL.appendChild(choiceButton);
    }
}

function gameOver() {
    clearInterval(timer);
    localStorage.setItem("score",score);

   // window.location.href = "gameOver.html";
}
function startTimer() {
    score = 0;
    if (timeRemainingEL) {
        timer = setInterval(function() {
            seconds -= 1;
            timeRemainingEL.innerHTML =  "Time remaining: " + seconds;
            if (seconds <= 0) {
                gameOver();
            }
        }, 1000);
    }    
}

function getQuestionTitleElement(questionNo) {
    var title = document.createElement("p");
    title.setAttribute("id", "questionTitle");
    title.textContent = questionList[questionNo].question;
    return title;
}

function makeRadioButton(text, value) {

    var mydiv = document.createElement("div");
    
    var label = document.createElement("label");
    label.setAttribute("id", "choice-label");

    var radio = document.createElement("input");
    radio.type = "radio";
    radio.value = value;
    radio.checked = false;
    radio.setAttribute("id", "choice-button");
    radio.addEventListener('change', function() {
       clickAnswer(this.value, questionList[currentQuestion].correctAnswer);
    });

    mydiv.appendChild(radio);
    mydiv.appendChild(label);

    label.innerText =  questionList[currentQuestion].choice[value];

    return mydiv;
}
function updateQuestionNUmber() 
{
    if (currentQuestion < questionList.length) {
        currentQuestion = currentQuestion + 1; 
    }
}
function setQuestion(number) {
    console.log("question non: " + questionNo);

    var title = document.getElementById('questionTitle');
    title.textContent = questionList[number].question;
    
    questionNo.textContent = "Question " + (number + 1) + " of " + questionList.length;
}   
function showResult(correct) {

    resultEl.hidden = false;

    if (correct) {
        answerEl.innerHTML = "Correct!";
    } else {
        answerEl.innerHTML = "Wrong!";
    }
}
function clickAnswer(userAnswer, correctAnswer) {

    resultEl.hidden = false;
    if (userAnswer == correctAnswer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    changeQuestion();
}
function changeQuestion() {
    currentQuestion = currentQuestion + 1;
    
    if (currentQuestion < questionList.length) {
        setTimeout(() => {
            resultEl.hidden= true;
            var question = document.getElementById('questionTitle')
            question.textContent = questionList[currentQuestion].question;
            
            var choiceLabel = document.querySelectorAll("#choice-label"); 
            var choicebutton = document.querySelectorAll("#choice-button"); 

            for (var i=0; i<choiceLabel.length; i++) {
                choiceLabel[i].textContent = questionList[currentQuestion].choice[i]; 
                choicebutton[i].checked = false;
               // choiceButton[i].value = i;

            }
            questionNo.textContent = "Question " + (currentQuestion + 1) + " of " + questionList.length;


        }, 1000);

    } else {
        setTimeout(() => {
            gameOver();
     }, 2000);
    }
}
function selectAnswer() {

    //checkAnswer(this.value, questionList[currentQuestion].correctAnswer);
}
function showResult() {

}
function rightAnswer() {
    score = score + 10;
    answerEl.innerHTML = "Correct!";
}
function wrongAnswer() {
    seconds = seconds - 5;
    buzzSound.play();
    if (seconds <= 0) {
        gameOver();
    }
    answerEl.innerHTML = "Wrong!";
}

init();