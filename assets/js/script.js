
var questionListEL = document.getElementById('questionlist');
var timeRemainingEL = document.getElementById('timeRemaining');
var resultEl = document.getElementById('result');
var questionNo = document.getElementById('questionNo');
var warningEl  = document.getElementById('warning');

var buzzSound = new Audio('./assets/images/buzz.wav');
var timer;
var currentQuestion = 0;
var seconds= 20;
var score = 0;

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
        "choice": ["It can not Handling dates and time.", "JavaScript is a object-based scripting language.", "JavaScript is not interpreter based scripting language.", "All of the above"],
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
function init() {
    
    createQuestionElement();
    startTimer();
}
function startTimer() {
    score = 0;
    
    timer = setInterval(function() {
        seconds -= 1;
        timeRemainingEL.innerHTML =  "Time remaining: " + seconds;
        if (seconds <= 0) {
            warningEl.innerHTML = "Time-up!!! It's Game Over"

            clearInterval(timer);

            setTimeout(() => {
                gameOver();
            }, 3000);
        }
        if (seconds <= 10 && seconds > 0) {
            warningEl.hidden = false;
            warningEl.innerHTML = "ALERT: Time is about to finish"
        }
    }, 1000);
}
function createQuestionElement() {
    
    var title = document.createElement("p");
    title.setAttribute("id", "questionTitle");
    title.textContent = questionList[currentQuestion].question;
    questionListEL.appendChild(title);
    
    for (var i=0; i<4; i++) {
        
        var choiceButton = createRadioButton(questionList[currentQuestion].choice[i],i);
        questionListEL.appendChild(choiceButton);
    }
}

function gameOver() {
    localStorage.setItem("score",score);
    window.location.href = "gameOver.html";
}

function createRadioButton(text, value) {
    
    var mydiv = document.createElement("div");
    
    var label = document.createElement("label");
    label.setAttribute("id", "choice-label");
    label.innerText =  questionList[currentQuestion].choice[value];
    
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
    return mydiv;
}
function clickAnswer(userAnswer, correctAnswer) {
    
    resultEl.style.display = "block";
    if (userAnswer == correctAnswer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    setTimeout(() => {
        updateQuestionNo();
    }, 1000);
}
function updateQuestionDetails(number) {
    questionNo.textContent = "Question " + (currentQuestion + 1) + " of " + questionList.length;
        
        var question = document.getElementById('questionTitle')
        question.textContent = questionList[currentQuestion].question;
        
        var choiceLabel = document.querySelectorAll("#choice-label"); 
        var choicebutton = document.querySelectorAll("#choice-button"); 
        
        for (var i=0; i<choiceLabel.length; i++) {
            choiceLabel[i].textContent = questionList[currentQuestion].choice[i]; 
            choicebutton[i].checked = false;
        }
}
function updateQuestionNo() {
    resultEl.style.display = "none";
    currentQuestion = currentQuestion + 1;
    
    if (currentQuestion < questionList.length) {
        updateQuestionDetails(currentQuestion);
    } else {
         gameOver();
    }
}
function rightAnswer() {
    score = score + 10;
    resultEl.innerHTML = "Correct!";
}
function wrongAnswer() {
    buzzSound.play();
    seconds = seconds - 5;
    if (seconds <= 0) {
        gameOver();
    }

    resultEl.innerHTML = "Wrong!";
}
init();