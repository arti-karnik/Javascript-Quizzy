
/*--------------------------------------------------------------
# Element and Variable declaration
--------------------------------------------------------------*/
var questionListEL = document.getElementById('Question');
var timeRemainingEL = document.getElementById('timeRemaining');
var mobileTimeEl = document.getElementById('timeRemaining-mobile');
var resultEl = document.getElementById('result');
var questionNo = document.getElementById('questionNo');
var warningEl  = document.getElementById('warning');
var timeMobileEl  = document.getElementById('warning');
var buzzSound = new Audio('./assets/images/buzz.mp3');
var timer;
var currentQuestion = 0;
var totalTime = 120;
var seconds= 120;
var score = 0;
var minus = 5;
var warningseconds = 10;

/*--------------------------------------------------------------
# Question List
--------------------------------------------------------------*/
var questionList = [
    {
        "question" : "Commonly used datatypes DO NOT  include:",
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
    },
    {
        "question" : "Which of the following is not a reserved word in JavaScript?",
        "choice": ["interface", "throws", "program", "short"],
        "correctAnswer": "2",
    },
    {
        "question" : "What should appear at the very end of your JavaScript?",
        "choice": ["</script>", "<script>", "The END statement", "None of the above"],
        "correctAnswer": "0",
    },
    {
        "question" : "JavaScript entities start with _______ and end with _________.",
        "choice": ["Semicolon, colon", "Semicolon, Ampersand", "Ampersand, colon", " Ampersand, semicolon"],
        "correctAnswer": "3",
    },
    {
        "question" : "Which of the following best describes JavaScript?",
        "choice": ["a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language.", "an object-oriented scripting language."],
        "correctAnswer": "3",
    },
    {
        "question" : "Which of the following is correct about features of JavaScript?",
        "choice": ["It cannot Handle dates and time.", "JavaScript is a object-based scripting language.", "JavaScript is not interpreter based scripting language.", "All of the above"],
        "correctAnswer": "1",
    },
    {
        "question" : "Choose the correct JavaScript syntax to change the content of the following HTML code.",
        "choice": ["document.getElement (“letsfindcourse\").innerHTML = \"I am a letsfindcourse\";", "document.getElementById (“letsfindcourse\").innerHTML = \"I am a letsfindcourse\";", " document.getId (“letsfindcourse\") = \"I am a letsfindcourse\";", "document.getElementById (“letsfindcourse\").innerHTML = I am a letsfindcourse;"],
        "correctAnswer": "1",
    },
    {
        "question" : "Which of the following is not Javascript frameworks or libraries?",
        "choice": ["Polymer", "Meteor.", "Cassandra", "jQuery"],
        "correctAnswer": "2",
    }
];
/*--------------------------------------------------------------
# Initialize to be called when page is loaded
--------------------------------------------------------------*/
function init() {
    
    createQuestionElement();
    startGame();
}
/*--------------------------------------------------------------
# Initialize to be called to start the Game
--------------------------------------------------------------*/
function startGame() {
    score = 0;
    seconds = totalTime;
    startTimer();
}
/*--------------------------------------------------------------
# Method to create initial elements required for Question ie Question Title & its Choice
--------------------------------------------------------------*/
function createQuestionElement() {

    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");

    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-sm");
    colEl.setAttribute("id", "question-title");
    colEl.innerText = questionList[currentQuestion].question;
    rowEl.appendChild(colEl);
    questionListEL.appendChild(rowEl);
    
    for (var i=0; i<4; i++) {
        
        createRadioButton(questionList[currentQuestion].choice[i],i);
    }
}
/*--------------------------------------------------------------
# Method to create radio button for Question-Choice 
--------------------------------------------------------------*/
function createRadioButton(text, value) {

    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");

    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-md");

    var radio = document.createElement("input");
    radio.type = "radio";
    radio.value = value;
    radio.checked = false;
    radio.name = "option";
    radio.setAttribute("id", "choice-button");
    radio.addEventListener('change', function() {
        clickAnswer(this.value, questionList[currentQuestion].correctAnswer);
    });

    var label = document.createElement("label");
    label.setAttribute("id", "choice-label");
    label.innerHTML =  questionList[currentQuestion].choice[value];

    colEl.appendChild(radio);
    colEl.appendChild(label);
    rowEl.appendChild(colEl);
    questionListEL.appendChild(rowEl);
}
/*--------------------------------------------------------------
# Method to start Timer for the quiz
--------------------------------------------------------------*/
function startTimer() {

    timer = setInterval(function() {
        seconds -= 1;
        timeRemainingEL.innerHTML =  "Time Left : " + getMinutes(seconds);
        mobileTimeEl.innerHTML = timeRemainingEL.textContent;
        
        if (seconds <= warningseconds && seconds > 0) {
            showWarning();
        }
        else if (seconds <= 0) {
            clearInterval(timer);
            warningEl.innerHTML = "Time-up!!! It's Game Over";
            gameOver();
        }
    }, 1000);
}
/*--------------------------------------------------------------
# Get method to convert seconds into minutes:seconds ie mm:ss
--------------------------------------------------------------*/
function getMinutes(time) {
    var minute = Math.floor(time % 3600 / 60);
    var second = Math.floor(time % 3600 % 60);

    var mDisplay = minute > 0 ? ("0" + minute + ":") : "00:";
    var sDisplay = second < 10 ? ("0" + second) : second;

    return  mDisplay + sDisplay;
}
/*--------------------------------------------------------------
# Method to disable/enabled radio buttons
Enable - By default for each question, choice radio button is enabled.
Disable - When answer is selected, disable radio buttons and user should not be able to change the answer 
--------------------------------------------------------------*/
function makeButtons(Isdisabled) {
    var choicebutton = document.querySelectorAll("#choice-button"); 
    for (i=0; i<choicebutton.length; i++) {
        console.log(Isdisabled);
        choicebutton[i].disabled =  Isdisabled;
    }
}
/*--------------------------------------------------------------
# Method called when answer is selected by the user
--------------------------------------------------------------*/
function clickAnswer(userAnswer, correctAnswer) {
    resultEl.hidden = false;
    makeButtons(true);

    if (userAnswer == correctAnswer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    setTimeout(function(){ 
        changeQuestionNo();
    }, 1000);
}
/*--------------------------------------------------------------
# Method called when answer is correct
--------------------------------------------------------------*/
function rightAnswer() {
    score = score + 10;
    resultEl.textContent = "Correct!";
}
/*--------------------------------------------------------------
# Method called when answer is wrong
--------------------------------------------------------------*/
function wrongAnswer() {
    buzzSound.play();
    seconds = seconds - minus + 1;
    if (seconds <= 0) {
        gameOver();
    }

    resultEl.innerHTML = "Wrong!";
}

/*--------------------------------------------------------------
# Method to update Question number ie Question 1 of 10 
--------------------------------------------------------------*/
function changeQuestionNo() {
   
    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questionList.length) {
        resultEl.hidden = true;
        makeButtons(false);
        updateQuestionDetails(currentQuestion);
    } else {
        warningEl.innerHTML = "All Done!";
        console.log("done with questiom");
        gameOver();
    }
}
/*--------------------------------------------------------------
# Method to update question details based on current Question No
number: Question number to be added
--------------------------------------------------------------*/
function updateQuestionDetails(number) {
    var question = document.getElementById('question-title');
    var choiceLabel = document.querySelectorAll("#choice-label"); 
    var choicebutton = document.querySelectorAll("#choice-button"); 
   
    questionNo.innerHTML = "Question " + (currentQuestion + 1) + " of " + questionList.length;
     question.textContent = questionList[currentQuestion].question;
    
    for (var i=0; i<choiceLabel.length; i++) {
        choiceLabel[i].textContent = questionList[currentQuestion].choice[i]; 
        choicebutton[i].checked = false;
    }
}
/*--------------------------------------------------------------
# Method to Show warning that time is about to finish
--------------------------------------------------------------*/
function showWarning()
{
    warningEl.style.visibility =  ( warningEl.style.visibility == "hidden")  ?  warningEl.style.visibility  = "visible" :   warningEl.style.visibility = "hidden";
}
/*--------------------------------------------------------------
# Method called when game is Over
--------------------------------------------------------------*/
function gameOver() {
    warningEl.style.visibility = "visible";
    
    setTimeout(() => {
        localStorage.setItem("score",score);
       window.location.href = "gameOver.html";
        }, 2000);
}
/*--------------------------------------------------------------
# Method to get confirmation from user to go to View Score page when quiz is on.
--------------------------------------------------------------*/
function ViewHighScoreButtonClicked() {
    var goToHighscore = confirm("Are you sure you want to go to View High Score page? If yes, your game won't be saved!");

    if (goToHighscore) {
        window.location.href = "ViewHighScores.html";
    }
}
/*--------------------------------------------------------------
# Method to get confirmation from user to go to Home Page when quiz is on.
--------------------------------------------------------------*/
function homeButtonClicked() {
    var goToHome = confirm("Are you sure you want to go to Home page? If yes, your game won't be saved!");

    if (goToHome) {
        window.location.href = "index.html";
    }}


init();