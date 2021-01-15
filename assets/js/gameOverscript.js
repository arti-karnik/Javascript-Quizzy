
var submitButton = document.getElementById('submit');
var scoreEl = document.getElementById('score1');
var nameEl = document.getElementById('initial');
var totalScore = localStorage.getItem("score");
var name;
var scores;

submitButton.addEventListener("click", function(){

    if (validateInitial()) {
        saveScore();
        window.location = "ViewHighScores.html";
    }
  // 
})

function init() {
    scoreEl.textContent = localStorage.getItem("score");
}
function createScoreObject(name, totalScore) {
    console.log(name, totalScore);

    var object = {
        "name": name, 
        "score": totalScore,
    }
    return object;

}
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
function validateInitial() {
    if (nameEl.value == "") {
        alert("Please enter Initials");
        return false;
    } 
    name = nameEl.value;

    return true;
}
init();