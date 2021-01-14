
var startButton = document.querySelector(".start-button");
var questionListEL = document.querySelector("#question-list");

var questionList = [
    {
        "question" : "question 1",
        "choice": ["choice 11", "choice12", "choice 13", "choice 14"],
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

console.log(questionList[2]["correct answer"]);

startButton.addEventListener("click", function() {
        window.location = "quiz.html";
  });