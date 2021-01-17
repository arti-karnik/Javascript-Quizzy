
    var highscoreEl = document.getElementById('row-highscore');
    var goBackButton = document.getElementById('goBack');
    var clearButton = document.getElementById('clear');

    function init() {
        showScores()
    }

    function showScores() {
        var highscores = JSON.parse(localStorage.getItem("highscores"));
        if (!highscores) return [];

        for (var i=0; i<highscores.length; i++) {
            var item = highscores[i];
    
            var row = document.createElement('div');
            row.setAttribute("class", "row");

            var col = document.createElement('div');
            col.setAttribute("class", "col-sm text-left");
            col.setAttribute("id", "row");
            col.innerHTML = " "+ " "  +  item.name + " - " + item.score;
            row.appendChild(col);
            highscoreEl.prepend(row);
        }
    }
    
clearButton.addEventListener("click", function() {
    var clear = confirm("Are you sure you want to clear all scores, if Yes it wont be back again ?");
    if (clear) {
        clearScores();
    }
})

goBackButton.addEventListener("click", function() {
    window.location.href = "index.html";
})

function removeAllRow() {
    while (highscoreEl.firstChild) {
        highscoreEl.removeChild(highscoreEl.firstChild);
    }
    alert("Scores are cleared!");
}
    function clearScores() {
        removeAllRow("row-highscore");
        localStorage.clear("highscores");
    }

init();