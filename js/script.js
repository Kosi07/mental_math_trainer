//Give better feedback
console.log("Mental Math Trainer is running..."); //For debugging purposes
var numOfDigits;
var numOfRows;
var operator = "+";
var answer;
var solution;
var correctness;
var position;
var numArray = [];
var timeInterval;
var timeArray = [];
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
    handleTimer();
}
;
function acceptUserInput() {
    var line1 = document.createElement("hr");
    var line2 = document.createElement("hr");
    container.appendChild(line1);
    var textbox = document.createElement("input");
    textbox.id = "answer";
    textbox.type = "text";
    textbox.inputMode = "numeric";
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
    function changeNumsAndAddXtraNumsIfNeeded() {
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
                changeNumsAndAddXtraNumsIfNeeded(); //and change textContent
            }
            ;
        }
        ;
    }
    ;
    //Change the operator in the DOM
    var operatorInput = document.getElementById("operator");
    var o = operatorInput.value;
    if (o == "-- Select --") {
        alert("-- Select -- is (as of now) NOT an operator.");
        operator = "+";
        operatorInput.value = "Addition(+)";
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
    else {
        alert("Division is currently not supported.");
        operator = "+";
        operatorInput.value = "Addition(+)";
    }
    ;
    clearInterval(timeInterval); //stop counting time
    rmXtraNums();
    changeNumsAndAddXtraNumsIfNeeded();
    handleTimer(); //start counting time again
}
;
function giveFeedback() {
    var mins = Number(document.getElementById("minutes").textContent);
    var secs = Number(document.getElementById("seconds").textContent);
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    var feedbackRow = document.getElementById("row1");
    if (feedbackRow == null) {
        var numbersData = document.createElement("td");
        var operatorData = document.createElement("td");
        var timeData = document.createElement("td");
        numbersData.textContent = "".concat(numArray);
        operatorData.textContent = operator;
        timeData.textContent = "".concat(mins, ":").concat(secs);
        feedbackRow.appendChild(numbersData);
        feedbackRow.appendChild(operatorData);
        feedbackRow.appendChild(timeData);
    }
    ;
    {
        feedbackRow.remove();
    }
    ;
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
function handleTimer() {
    document.getElementById("seconds").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    var then = new Date();
    var thenHr = then.getHours();
    var thenMin = then.getMinutes();
    var thenSec = then.getSeconds();
    var thenTotalSec = (thenHr * 3600) + (thenMin * 60) + (thenSec);
    timeInterval = setInterval(function () {
        var minutes = document.getElementById("minutes");
        var seconds = document.getElementById("seconds");
        var now = new Date();
        var nowHr = now.getHours();
        var nowMin = now.getMinutes();
        var nowSec = now.getSeconds();
        var nowTotalSec = (nowHr * 3600) + (nowMin * 60) + (nowSec);
        var dTotalSec = nowTotalSec - thenTotalSec;
        var min = Math.floor((dTotalSec % 3600) / 60);
        var sec = (dTotalSec % 3600) % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        seconds.textContent = sec;
        minutes.textContent = min;
    }, 1000);
}
;
//If mins>60, switch to new numbers
setInterval(function () {
    var mins = Number(document.getElementById("minutes").textContent);
    var secs = Number(document.getElementById("seconds").textContent);
    if (mins === 59 && secs === 59) {
        alert("You've wasted ".concat(mins, " mins and ").concat(secs, " secs. Give Up!"));
        changeNumsAndOperatorInDOM();
    }
}, 700);
//Program starts here
document.getElementById("numOfDigits").value = 2;
document.getElementById("numOfRows").value = 2;
document.getElementById("operator").value = "Addition(+)";
generateNum(numArray); //Generate random numbers and store in an array
writeDivToDOM(); //Load random numbers in browser as div
acceptUserInput(); //Load user input section in browser
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
            solution *= numArray[i]; //Multiply up the numbers
        }
        ;
    }
    else {
        alert("Please select an Operator from the dropdown menu.");
    }
    console.log(""); //For debugging purposes
    console.log("numArray: ".concat(numArray)); //For debugging purposes
    console.log("ans: ".concat(answer, ", soln: ").concat(solution)); //For debugging purposes
    if (answer === solution) {
        //giveFeedback();
        changeNumsAndOperatorInDOM(); //Replace the number on screen with new numbers
        document.getElementById("answer").value = ""; //clear input textbox after hitting enter key
    }
};
document.getElementById("saveChangesBtn").onclick = function () {
    changeNumsAndOperatorInDOM();
    var settingsSidebar = document.querySelector("#settings-sidebar");
    settingsSidebar.classList.toggle("translate-x-0");
    settingsSidebar.classList.toggle("translate-x-full");
};
document.getElementById("hamburger-icon").onclick = function () {
    var sidebar = document.querySelector("#sidebar");
    var settingsSidebar = document.querySelector("#settings-sidebar");
    sidebar.classList.toggle("translate-x-0");
    sidebar.classList.toggle("-translate-x-full");
    if (settingsSidebar.classList.contains("translate-x-0")) { //If open, close it
        settingsSidebar.classList.toggle("translate-x-0");
        settingsSidebar.classList.toggle("translate-x-full");
    }
};
document.getElementById("settings-icon").onclick = function () {
    var settingsSidebar = document.querySelector("#settings-sidebar");
    var sidebar = document.querySelector("#sidebar");
    settingsSidebar.classList.toggle("translate-x-0");
    settingsSidebar.classList.toggle("translate-x-full");
    if (sidebar.classList.contains("translate-x-0")) {
        sidebar.classList.toggle("translate-x-0");
        sidebar.classList.toggle("-translate-x-full");
    }
};
