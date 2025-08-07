//Give better feedback
//Figure out exponents
console.log("Mental Math Trainer is running..."); //For debugging purposes
var numOfDigits;
var numOfRows;
var operator = "?";
var answer;
var solution;
var correctness;
var position;
var numArray = [];
var line1 = document.createElement("hr");
var line2 = document.createElement("hr");
var startTime;
var endTime;
var timeSpent;
var time;
var container = document.querySelector("#container");
var theNumbers = document.querySelector(".theNumbers");
function generateNum(array) {
    getSettings();
    var z = 1;
    for (var i = 1; i <= numOfDigits; i++) {
        z = z + "0"; //1,z=10 2,z=100 3,z=1000
    }
    ;
    z = Number(z);
    var counter = 0;
    while (counter < numOfRows) {
        var num = String(Math.trunc(Math.random() * z));
        if (num.length == numOfDigits) { //Strictly sets the numOfDigits to the required amount
            array.push(Number(num));
            counter++;
        }
    }
    ;
}
;
function writeDivToDOM() {
    for (var i = 1; i <= numOfRows; i++) {
        var number = document.createElement("div");
        number.textContent = numArray[i - 1];
        number.id = "num".concat(i);
        if (i == numOfRows) {
            number.className = "flex justify-between";
            number.textContent = "".concat(operator, " ").concat(number.textContent);
        }
        theNumbers.appendChild(number);
    }
    ;
}
;
function acceptUserInput() {
    container.appendChild(line1);
    var textbox = document.createElement("input");
    textbox.id = "answer";
    textbox.className = "text-right";
    container.appendChild(textbox);
    container.appendChild(line2);
}
;
function changeNumsAndOperatorInDOM() {
    var prevNumOfRows = Number(numOfRows);
    for (var i = 1; i <= prevNumOfRows; i++) {
        var number = document.getElementById("num".concat(i));
        if (i == numOfRows) { //For the last number...
            number.className = ""; //...remove its previous styling
        }
    }
    numArray = [];
    generateNum(numArray);
    function rmXtraNums() {
        if (prevNumOfRows > numOfRows) {
            for (var i = 1; i <= prevNumOfRows; i += 1) {
                if (i > numOfRows) {
                    var xtraNum = document.getElementById("num".concat(i));
                    theNumbers.removeChild(xtraNum);
                }
                ;
            }
            ;
        }
    }
    ;
    function addXtraNums() {
        for (var i = 1; i <= numOfRows; i++) {
            if (document.getElementById("num".concat(i)) != null) { //If the element with the id exists...
                var numb = document.getElementById("num".concat(i));
                numb.textContent = numArray[i - 1]; //Just change textContent
                if (i == numOfRows) {
                    numb.className = "flex justify-between";
                    numb.textContent = "".concat(operator, " ").concat(numb.textContent);
                }
            }
            else { //else create new divs
                var number = document.createElement("div");
                number.id = "num".concat(i);
                theNumbers.appendChild(number);
                addXtraNums(); //and change textContent
            }
            ;
        }
        ;
    }
    ;
    //Change the operator in the DOM
    var o = document.getElementById("operator").value;
    if (o == "-- Select --") {
        alert("-- Select -- is (as of now) NOT an operator.");
        operator = "+";
        document.getElementById("operator").value = "Addition(+)";
    }
    else if (o == "Addition(+)") {
        operator = "+";
    }
    else if (o == "Subtraction(-)") {
        operator = "-";
    }
    else if (o == "Multiplication(x)") {
        operator = "x";
    }
    else if (o == "Exponents(n\u00B2)") {
        operator = "^";
    }
    else {
        alert("Division is currently not supported.");
        operator = "+";
        document.getElementById("operator").value = "Addition(+)";
    }
    ;
    rmXtraNums();
    addXtraNums();
}
;
function giveFeedback() {
    var feedback = document.getElementById("feedback");
    if (answer === solution) {
        feedback.textContent = "".concat(answer, " is correct \uD83E\uDD73\u2705\u2705\u2705");
    }
    else if (answer == "") {
        feedback.textContent = "Dude WTF? You didn't even write anything.";
    }
    else {
        correctness = Math.floor((answer / solution) * 100);
        if (answer > solution) {
            position = "high";
        }
        else { //answer < solution
            position = "low";
        }
        ;
        feedback.textContent = "WRONG\u2757\u2757 You were\u300E".concat(correctness, "%\u300Fclose. You guessed too ").concat(position);
    }
    ;
    timeSpent = ((endTime - startTime) / 1000);
    if (timeSpent >= 60) {
        timeSpent = timeSpent / 60; //convert to minutes.
        time = "mins.";
    }
    else {
        time = "secs.";
    }
    ;
    document.getElementById("timeSpent").textContent = "\uD83D\uDD51\uFE0FTime spent: ".concat(timeSpent.toFixed(2), " ").concat(time);
}
;
function getSettings() {
    numOfDigits = document.getElementById("numOfDigits").value;
    if (numOfDigits == "") {
        numOfDigits = 2;
        document.getElementById("numOfDigits").value = 2;
    }
    numOfRows = document.getElementById("numOfRows").value;
    if (numOfRows == "") {
        numOfRows = 2;
        document.getElementById("numOfRows").value = 2;
    }
}
;
//Program starts here
document.getElementById("numOfDigits").value = 2;
document.getElementById("numOfRows").value = 2;
generateNum(numArray); //Generate random numbers and store in an array
writeDivToDOM(); //Load random numbers in browser as div
acceptUserInput(); //Load user input section in browser
startTime = Date.now(); //start measuring time
var minDigits = Number(document.getElementById("numOfDigits").getAttribute("min"));
var maxDigits = Number(document.getElementById("numOfDigits").getAttribute("max"));
document.getElementById("numOfDigits").oninput = function () {
    this.value = this.value.replace(/-/g, "");
    if (this.value < minDigits || this.value > maxDigits) { // ||=OR logical operator
        this.value = "";
    }
};
var minRows = Number(document.getElementById("numOfRows").getAttribute("min"));
var maxRows = Number(document.getElementById("numOfRows").getAttribute("max"));
document.getElementById("numOfRows").oninput = function () {
    this.value = this.value.replace(/-/g, "");
    if (this.value < minRows || this.value > maxRows) {
        this.value = "";
    }
};
document.getElementById("answer").oninput = function () {
    this.value = this.value.replace(/[^0-9,-]/g, "");
    endTime = Date.now(); //stop measuring time
    if (operator == "+") {
        solution = 0;
        answer = document.getElementById("answer").value;
        answer = Number(answer);
        for (var i = 0; i < numOfRows; i++) {
            solution += numArray[i]; //sum up the numbers
        }
        ;
    }
    else if (operator == "-") {
        solution = numArray[0];
        answer = document.getElementById("answer").value;
        answer = Number(answer);
        for (var i = 1; i < numOfRows; i++) {
            solution -= numArray[i]; //subtract the numbers
        }
        ;
    }
    else if (operator == "x") {
        solution = 1;
        answer = document.getElementById("answer").value;
        answer = Number(answer);
        for (var i = 0; i < numOfRows; i++) {
            solution *= numArray[i]; //sum up the numbers
        }
        ;
    }
    else if (operator == "^") {
        console.log("operator = ".concat(operator));
    }
    else if (operator == "?") {
        alert("Please select an Operator from the dropdown menu.");
    }
    console.log(""); //For debugging purposes
    console.log("numArray: ".concat(numArray)); //For debugging purposes
    console.log("ans: ".concat(answer, ", soln: ").concat(solution)); //For debugging purposes
    if (answer === solution) {
        changeNumsAndOperatorInDOM(); //Replace the number on screen with new numbers
        document.getElementById("answer").value = ""; //clear input textbox after hitting enter key
        startTime = Date.now(); //start measuring time
    }
    //giveFeedback();
};
document.getElementById("saveChangesBtn").onclick = function () {
    changeNumsAndOperatorInDOM();
    document.getElementById("feedback").textContent = "";
    document.getElementById("timeSpent").textContent = "";
};
document.getElementById("hamburger-icon").onclick = function () {
    var sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("translate-x-0");
    sidebar.classList.toggle("-translate-x-full");
};
document.getElementById("settings-icon").onclick = function () {
    var settingsSidebar = document.querySelector("#settings-sidebar");
    settingsSidebar.classList.toggle("translate-x-0");
    settingsSidebar.classList.toggle("translate-x-full");
};
