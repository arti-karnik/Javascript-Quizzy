
/*--------------------------------------------------------------
# Element and Variable declaration
--------------------------------------------------------------*/
var startButton = document.getElementById('start');
var instructionEl = document.getElementById('instruction');

var heading = "Please read below instructions to play the quiz & when you are ready click 'Start quiz' to begin and your time will start.   <br>"
var instruction = [
    "This quiz consists of 10 multi-choice questions and you have 2 minutes to complete it.",
    "For every correct answer, 10 points are awarded.",
    "For every incorrect answer, a buzzer will sound and 5 seconds will be deducted from the remainining time.",
    "Correct/Wrong will be displayed for each question once an choice is selected and it cannot be changed.",
    "Countdown timer is shown on top-right side of page, when last 10 seconds remain alert message is shown to the user.",
    "Try to answer the following code-related questions within the time limit."
];
/*--------------------------------------------------------------
# Initialize method called on page load 
--------------------------------------------------------------*/
function init(){
    createUI();
}
/*--------------------------------------------------------------
# Method to create Basic UI for the page 
--------------------------------------------------------------*/
function createUI() {
   
    createTitleElement();
    createHeadingElement();
    createInstructionElement();
}
/*--------------------------------------------------------------
# Method to create Title Element 
--------------------------------------------------------------*/

function createTitleElement() {
    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");
    rowEl.style.fontWeight = "bold";

    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-sm");
    instructionEl.appendChild(rowEl);
}
/*--------------------------------------------------------------
# Method to create Heading Element 
--------------------------------------------------------------*/

function createHeadingElement() {
    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");
    
    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-sm");
    colEl.innerHTML = heading;
    rowEl.appendChild(colEl);
    instructionEl.appendChild(rowEl);
}
/*--------------------------------------------------------------
# Method to create Instruction Element Element 
--------------------------------------------------------------*/
function createInstructionElement() {
    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");

    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-sm");
    var ulElement = document.createElement("ul");

    for (var i=0; i<instruction.length; i++) {
        var liElement = document.createElement("li");
        liElement.innerHTML = instruction[i];
        ulElement.appendChild(liElement);
    }
    colEl.appendChild(ulElement);
    rowEl.appendChild(colEl);
    instructionEl.appendChild(rowEl);
}
/*--------------------------------------------------------------
# Start Button event
--------------------------------------------------------------*/
startButton.addEventListener("click", function(){
    console.log("first function ");
     window.location = "quiz.html";
})
init();