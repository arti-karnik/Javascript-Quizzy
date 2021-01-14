
var questionListEL = document.getElementById('questionlist');
var currentQuestion = 0;

var questionList = [
    {
        "question" : "Commonly used datatypes Donot include:",
        "choice": ["choice 11", "choice 12", "choice 13", "choice 14"],
        "correct answer": "1",
    },
    {
        "question" : "question 2",
        "choice": ["choice 21", "choice 22", "choice 23", "choice 24"],
        "correct answer": "2",
    },
    {
        "question" : "question 3",
        "choice": ["choice 31", "choice 32", "choice 33", "choice 34"],
        "correct answer": "3",
    },
    {
        "question" : "question 4",
        "choice": ["choice 41", "choice 42", "choice 43", "choice 44"],
        "correct answer": "0",
    },
    {
        "question" : "question 5",
        "choice": ["choice 51", "choice 52", "choice 53", "choice 54"],
        "correct answer": "1",
    }
];
function getQuestionForId(id) {
    return questionList[currentQuestion].question;
}
function createQuestion() {

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
function updateQuestion() {
    var questionTitleEl = document.getElementById('questionTitle');
    questionTitle.textContent = questionList[currentQuestion].question;

    var choiceButtons = document.querySelectorAll(".choice-button"); 
    
    for (var i=0; i<choiceButtons.length; i++) {
        choiceButtons[i].textContent = questionList[currentQuestion].choice[i];
    }

}

function selectAnswer() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion < questionList.length) {
        updateQuestion();
    }
}

  createQuestion();