//Give better feedback
console.log(`Mental Math Trainer is running...`); //For debugging purposes
let numOfDigits;
let numOfRows;
let operator = `+`;

let answer;
let solution:number;
let correctness:number;
let position;

let numArray = [];

let timeInterval;
let timeArray = [];

const container = document.querySelector(`#container`) as HTMLDivElement;
const theNumbers = document.querySelector(`.theNumbers`) as HTMLDivElement;


function generateNum(array: number[]){
    getSettings();
    let z:any = 1;
    for(let i=1; i<=numOfDigits; i++){
        z = z + `0`;     //1,z=10 2,z=100 3,z=1000
    };
    z = Number(z);
    var counter=0;
    while(counter<numOfRows){
        let num = String(Math.trunc(Math.random()*z));
        if (num.length == numOfDigits){     //Strictly sets the numOfDigits to the required amount
            array.push(Number(num));
            counter++;
        }
    };
};

function writeDivToDOM(){
    for(let i=1; i<=numOfRows; i++){
        let number = document.createElement(`div`);
        number.textContent = numArray[i-1];
        number.id = `num${i}`;
        if (i == numOfRows){
            number.className = `flex justify-between`;
            number.textContent = `${operator} ${number.textContent}`;
        }
        theNumbers.appendChild(number);
    };
    
    handleTimer();
};

function acceptUserInput(){
    let line1 = document.createElement(`hr`);
    let line2 = document.createElement(`hr`);

    container.appendChild(line1);
    let textbox = document.createElement(`input`);
    textbox.id = `answer`;
    textbox.type = `text`;
    textbox.inputMode = `numeric`
    textbox.className = `text-right`
    container.appendChild(textbox);
    container.appendChild(line2);
};

function changeNumsAndOperatorInDOM(){  //Replace the numbers in the DOM with new random numbers
    let prevNumOfRows = Number(numOfRows);
    for(let i=1; i<=prevNumOfRows; i++){
        let number = document.getElementById(`num${i}`) as HTMLDivElement;
        if (i == numOfRows){         //For the last number...
            number.className = ``;  //...remove its previous styling
        }
    }
    numArray = [];
    generateNum(numArray);

    function rmXtraNums(){
        if (prevNumOfRows>numOfRows){
        for(let i=1; i<=prevNumOfRows; i+=1){
        if(i>numOfRows){
            let xtraNum = document.getElementById(`num${i}`) as HTMLDivElement;
            theNumbers.removeChild(xtraNum);
        };
    };
    }
    };

    function changeNumsAndAddXtraNumsIfNeeded(){
        for(let i=1; i<=numOfRows; i++){
          if (document.getElementById(`num${i}`) != null){   //If the element with the id exists...
            let numb = document.getElementById(`num${i}`) as HTMLDivElement;
            numb.textContent = numArray[i-1];  //Just change textContent
            if (i == numOfRows){
            numb.className = `flex justify-between`;
            numb.textContent = `${operator} ${numb.textContent}`;
          }
        }
          else{                                                //else create new divs
            let number = document.createElement(`div`);
            number.id = `num${i}`;
            theNumbers.appendChild(number);
            changeNumsAndAddXtraNumsIfNeeded();                                  //and change textContent
        };
    };
    };

    //Change the operator in the DOM
    let operatorInput = document.getElementById(`operator`) as HTMLInputElement;
    let o = operatorInput.value;
    if (o == `-- Select --`){
        alert(`-- Select -- is (as of now) NOT an operator.`);
        operator = `+`;
        operatorInput.value = `Addition(+)`;
    }
    else if (o == `Addition(+)`){
        operator = `+`;
    }
    else if (o ==`Subtraction(-)`){
        operator = `-`;
    }
    else if (o ==`Multiplication(x)`){
        operator = `x`;
    }
    else{
        alert(`Division is currently not supported.`);
        operator = `+`;
        operatorInput.value = `Addition(+)`;
    };

    clearInterval(timeInterval); //stop counting time

    rmXtraNums();
    changeNumsAndAddXtraNumsIfNeeded();

    handleTimer(); //start counting time again
};

function giveFeedback(){
    let mins = Number(document.getElementById(`minutes`).textContent);
    let secs = Number(document.getElementById(`seconds`).textContent);

    mins = mins<10? `0`+mins : mins;
    secs = secs<10? `0`+secs : secs;

    let feedbackRow = document.getElementById(`row1`);

    if(feedbackRow==null){
        let numbersData = document.createElement(`td`);
        let operatorData = document.createElement(`td`);
        let timeData = document.createElement(`td`);

        numbersData.textContent = `${numArray}`;
        operatorData.textContent = operator;
        timeData.textContent = `${mins}:${secs}`;

        feedbackRow.appendChild(numbersData);
        feedbackRow.appendChild(operatorData);
        feedbackRow.appendChild(timeData);
    };
    else{
        feedbackRow.remove();
    };
};

function getSettings(){
    numOfDigits = document.getElementById(`numOfDigits`).value;
    if (numOfDigits == ``){
        numOfDigits = 2;
        document.getElementById(`numOfDigits`).value = 2;
    }

    numOfRows = document.getElementById(`numOfRows`).value;
    if (numOfRows == ``){
        numOfRows = 2;
        document.getElementById(`numOfRows`).value = 2;
    }
};

function handleTimer(){
    document.getElementById(`seconds`).textContent = `00`;
    document.getElementById(`minutes`).textContent = `00`;

    let then = new Date();
    let thenHr = then.getHours();
    let thenMin = then.getMinutes();
    let thenSec = then.getSeconds();

    let thenTotalSec = (thenHr*3600)+(thenMin*60)+(thenSec);

    timeInterval = setInterval(function(){
        const minutes = document.getElementById(`minutes`);
        const seconds = document.getElementById(`seconds`);

        let now = new Date();
        let nowHr = now.getHours();
        let nowMin = now.getMinutes();
        let nowSec = now.getSeconds();

        let nowTotalSec = (nowHr*3600)+(nowMin*60)+(nowSec);

        let dTotalSec = nowTotalSec-thenTotalSec;

        let min:any = Math.floor((dTotalSec % 3600)/60);
        let sec:any = (dTotalSec % 3600)%60;

        min = min<10? `0` + min : min;
        sec = sec<10? `0` + sec : sec;

        seconds.textContent = sec;
        minutes.textContent = min;
    },1000);
};

//If mins>60, switch to new numbers
setInterval(function(){
    let mins = Number(document.getElementById(`minutes`).textContent);
    let secs = Number(document.getElementById(`seconds`).textContent);

    if(mins === 59 && secs === 59){
            alert(`You've wasted ${mins} mins and ${secs} secs. Give Up!`);
            changeNumsAndOperatorInDOM();
    }
}, 700);


//Program starts here
document.getElementById(`numOfDigits`).value = 2;
document.getElementById(`numOfRows`).value = 2;
document.getElementById(`operator`).value = `Addition(+)`;
generateNum(numArray);   //Generate random numbers and store in an array
writeDivToDOM();         //Load random numbers in browser as div
acceptUserInput();       //Load user input section in browser


let minDigits = Number(document.getElementById(`numOfDigits`).getAttribute(`min`));
let maxDigits = Number(document.getElementById(`numOfDigits`).getAttribute(`max`));
document.getElementById(`numOfDigits`).oninput = function(){    //Allows the user to type ONLY positive integers
    this.value = this.value.replace(/-/g, ``);
    if (this.value < minDigits || this.value > maxDigits){   // ||=OR logical operator
        this.value = ``;
    }
};

let minRows = Number(document.getElementById(`numOfRows`).getAttribute(`min`));
let maxRows = Number(document.getElementById(`numOfRows`).getAttribute(`max`));
document.getElementById(`numOfRows`).oninput = function(){    
    this.value = this.value.replace(/-/g, ``);
    if (this.value < minRows || this.value > maxRows){
        this.value = ``;
    }
};

document.getElementById(`answer`).oninput = function(){     //when the user starts typing in an answer
        this.value = this.value.replace(/[^0-9,-]/g, ``);

        if (operator == `+`){
            solution = 0;
            answer = document.getElementById(`answer`).value;
            answer = Number(answer);
            for (let i=0; i<numOfRows; i++){      
                solution += numArray[i];     //sum up the numbers
            };
        }
        else if (operator == `-`){
            solution = numArray[0];
            answer = document.getElementById(`answer`).value;
            answer = Number(answer);
            for (let i=1; i<numOfRows; i++){      
                solution -= numArray[i];     //subtract the numbers
            };
        }
        else if (operator == `x`){
            solution = 1;
            answer = document.getElementById(`answer`).value;
            answer = Number(answer);
            for (let i=0; i<numOfRows; i++){      
                solution *= numArray[i];     //Multiply up the numbers
            };
        }
        else{
            alert(`Please select an Operator from the dropdown menu.`);
        }
        
        console.log(``);    //For debugging purposes
        console.log(`numArray: ${numArray}`); //For debugging purposes
        console.log(`ans: ${answer}, soln: ${solution}`); //For debugging purposes

        if (answer === solution){
            //giveFeedback();
            changeNumsAndOperatorInDOM();        //Replace the number on screen with new numbers
            document.getElementById(`answer`).value = ``; //clear input textbox after hitting enter key
        }
};

document.getElementById(`saveChangesBtn`).onclick = function(){
    changeNumsAndOperatorInDOM();
    let settingsSidebar = document.querySelector(`#settings-sidebar`) as HTMLDivElement;
    settingsSidebar.classList.toggle(`translate-x-0`);
    settingsSidebar.classList.toggle(`translate-x-full`);
};

document.getElementById(`hamburger-icon`).onclick = function(){
    let sidebar = document.querySelector(`#sidebar`) as HTMLDivElement;
    let settingsSidebar = document.querySelector(`#settings-sidebar`) as HTMLDivElement;
    sidebar.classList.toggle(`translate-x-0`);
    sidebar.classList.toggle(`-translate-x-full`);
    if (settingsSidebar.classList.contains(`translate-x-0`)){ //If open, close it
        settingsSidebar.classList.toggle(`translate-x-0`);
        settingsSidebar.classList.toggle(`translate-x-full`);
    }
};

document.getElementById(`settings-icon`).onclick = function(){
    let settingsSidebar = document.querySelector(`#settings-sidebar`) as HTMLDivElement;
    let sidebar = document.querySelector(`#sidebar`) as HTMLDivElement;
    settingsSidebar.classList.toggle(`translate-x-0`);
    settingsSidebar.classList.toggle(`translate-x-full`);
    if (sidebar.classList.contains(`translate-x-0`)){
        sidebar.classList.toggle(`translate-x-0`);
        sidebar.classList.toggle(`-translate-x-full`);
    }
};

