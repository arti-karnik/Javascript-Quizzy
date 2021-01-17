
var startButton = document.getElementById('start');
var instructionEl = document.getElementById('instruction');
var heading = " Welcome to Web-Development Quiz challenge. This quiz consist of 10 multi-choice questions. Each correct answer you get 10 marks and incorrect answer will deduct 10 seconds from total time. Get ready and When you are ready click on Start button and your time will start."
var instruction = [
    "Each correct answer you get 10 marks and incorrect answer will deduct 10 seconds from total time.",
    "Get ready and Try to answer the following code-related qusetions within the time limit.",
    "Try to answer the following code-related qusetions within the time limit. Keep in mind that incorrect answers will penalize your score/Time by ten seconds",
    "Try to answer the following code-related qusetions within the time limit."
];

startButton.addEventListener("click", function(){
    console.log("click");
    window.location = "quiz.html";
})

function createInstructionElement() {
    var divEl = document.createElement("div");
    divEl.setAttribute("style", "text-align:center");

    var headerEl = document.createElement("p");
    headerEl.textContent = heading;

    var ulElement = document.createElement("ul");

    for (var i=0; i<instruction.length; i++) {
        var liElement = document.createElement("li");
        liElement.textContent = instruction[i];
        ulElement.appendChild(liElement);
    }
    divEl.appendChild(headerEl);
    divEl.appendChild(ulElement);
    instructionEl.append(divEl);
}
  
function init(){
    createInstructionElement();
}
init();