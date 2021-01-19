
/*--------------------------------------------------------------
# Element and Variable declaration
--------------------------------------------------------------*/
var submitButton = document.getElementById('submit');
var tryAgainButton = document.getElementById('again');
var correctEl = document.getElementById('correct');
var scoreEl = document.getElementById('score');
var nameEl = document.getElementById('name');
var totalScore = localStorage.getItem("score");
var name;
var scores;

/*--------------------------------------------------------------
# Submit Button event
--------------------------------------------------------------*/
submitButton.addEventListener("click", function(){
    
    if (validateInitial()) {
        saveScore();
        window.location = "ViewHighScores.html";
    }
})
/*--------------------------------------------------------------
# Try Again button event
--------------------------------------------------------------*/
tryAgainButton.addEventListener("click", function(){
    if (validateTryAgain()) {
        window.location = "quiz.html";
    }
})
/*--------------------------------------------------------------
# Initialize method
--------------------------------------------------------------*/
function init() {
    var correct = localStorage.getItem("score")/10;
    scoreEl.textContent = localStorage.getItem("score");
    correctEl.textContent = correct + " / 10";
}
/*--------------------------------------------------------------
# Create object variable for saving score details
--------------------------------------------------------------*/
function createScoreObject(name, totalScore) {
    
    var object = {
        "name": name, 
        "score": totalScore,
    }
    return object;
}
/*--------------------------------------------------------------
# Method to save Score 
--------------------------------------------------------------*/
function saveScore() {
    var object = createScoreObject(name, totalScore);
    var savedData = localStorage.getItem("highscores");
    
    if (savedData === null) { 
        scores = [object];
    } else {
        scores = JSON.parse(savedData);
        scores.push(object);
    }   
    localStorage.setItem('highscores', JSON.stringify(scores));
}
/*--------------------------------------------------------------
# Validate if initial are entered
--------------------------------------------------------------*/
function validateInitial() {
    if (nameEl.value == "") {
        alert("Please enter Initials");
        return false;
    } 
    name = nameEl.value;
    
    return true;
}
/*--------------------------------------------------------------
#  Method to show confirm prompt when clicked on Try Again
--------------------------------------------------------------*/
function validateTryAgain() {
    var confimr = confirm("Your score will not be saved and new game will start. Are you sure you want to continue? ");
    if (confimr) {
        return true;
    }
    return false;
}

init();