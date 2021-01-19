
/*--------------------------------------------------------------
# Element and Variable declaration
--------------------------------------------------------------*/
var highscoreEl = document.getElementById('row-highscore');
var goBackButton = document.getElementById('goBack');
var clearButton = document.getElementById('clear');
var highScoreTitleEl = document.getElementById('highScore-title');
var isScoreSaved;

/*--------------------------------------------------------------
# Initialize method
--------------------------------------------------------------*/
function init() {
    showScores();
    basicUI();
}
/*--------------------------------------------------------------
# Method to basic UI setup 
--------------------------------------------------------------*/
function basicUI() {
        
    if (isScoreSaved) {
        clearButton.disabled = false;
        highScoreTitleEl.textContent = "High Scores";
    } else {
        clearButton.disabled = true;
        highScoreTitleEl.textContent = "No High Scores";
    }
}
/*--------------------------------------------------------------
# Go back button Event
--------------------------------------------------------------*/
goBackButton.addEventListener("click", function() {
    window.location.href = "quiz.html";
})

/*--------------------------------------------------------------
# Clear button Event
--------------------------------------------------------------*/
clearButton.addEventListener("click", function() {
    var clear = confirm("Are you sure you want to clear all scores?");
    if (clear) {
        clearScores();
    }
})

/*--------------------------------------------------------------
# Method to Show scores 
--------------------------------------------------------------*/
function showScores() {
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (!highscores) { 
        isScoreSaved = false;
        basicUI();
        return [] };
        
        
    for (var i=0; i<highscores.length; i++) {
         var item = highscores[i];
            
        var row = document.createElement('div');
        row.setAttribute("class", "row");
        row.setAttribute("id", "row");
            
        var col1 = document.createElement('div');
        col1.setAttribute("class", "col-sm");
        col1.innerHTML = item.name;
        col1.style.textAlign = "center";
            
        var col2 = document.createElement('div');
        col2.setAttribute("class", "col-sm");
        col2.innerHTML = item.score;
        col2.style.textAlign = "center";
            
        row.appendChild(col1);
        row.appendChild(col2);
        highscoreEl.prepend(row);
    }
        
    var row = document.createElement('div');
    row.setAttribute("class", "row");
    row.setAttribute("id", "row");
    
    var col1 = document.createElement('div');
    col1.setAttribute("class", "col-sm");
    col1.textContent = "NAME";
    col1.setAttribute("font-weight", "bold");
    col1.style.fontWeight = "bold";
    col1.style.textAlign = "center";
    
    var col2 = document.createElement('div');
    col2.setAttribute("class", "col-sm");
    col2.setAttribute("text-align:", "center");
    col2.textContent = "SCORE";
    col2.style.fontWeight = "bold";
    col2.style.textAlign = "center";
    
    row.appendChild(col1);
    
    row.appendChild(col2);
    highscoreEl.prepend(row);
    isScoreSaved = true;
}

/*--------------------------------------------------------------
# Method to clear scores 
--------------------------------------------------------------*/
function clearScores() {
    isScoreSaved = false;
    while (highscoreEl.firstChild) {
        highscoreEl.removeChild(highscoreEl.firstChild);
    }
    localStorage.clear("highscores");
    highScoreTitleEl.textContent = isScoreSaved ? "High Scores" : "No High Scores";
    clearButton.disabled = !isScoreSaved;
}
init();