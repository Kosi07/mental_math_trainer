//Give better feedback
//Figure out exponents
console.log(`Mental Math Trainer is running...`); //For debugging purposes
let numOfDigits;
let numOfRows;
let operator = `?`;

let answer;
let solution:number;
let correctness:number;
let position;

let numArray = [];
let line1 = document.createElement(`hr`);
let line2 = document.createElement(`hr`);

let startTime;
let endTime;
let timeSpent;
let time;

const container = document.querySelector(`#container`) as HTMLDivElement;
const theNumbers = document.querySelector(`.theNumbers`) as HTMLDivElement;


function generateNum(array){
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
};

function acceptUserInput(){
    container.appendChild(line1);
    let textbox = document.createElement(`input`);
    textbox.id = `answer`;
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

    function addXtraNums(){
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
            addXtraNums();                                  //and change textContent
        };
    };
    };

    //Change the operator in the DOM
    let o = document.getElementById(`operator`).value;
    if (o == `-- Select --`){
        alert(`-- Select -- is (as of now) NOT an operator.`);
        operator = `+`;
        document.getElementById(`operator`).value = `Addition(+)`;
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
    else if (o == `Exponents(n²)`){
        operator = `^`;
    }
    else{
        alert(`Division is currently not supported.`);
        operator = `+`;
        document.getElementById(`operator`).value = `Addition(+)`;
    };
    rmXtraNums();
    addXtraNums();
};

function giveFeedback(){
    let feedback = document.getElementById(`feedback`);
    if (answer === solution){
        feedback.textContent = `${answer} is correct 🥳✅✅✅`;
  }
    else if(answer == ``){
        feedback.textContent = `Dude WTF? You didn't even write anything.`
    }
    else{
        correctness = Math.floor((answer/solution)*100)
        if (answer>solution){
            position = `high`;
        }
        else{   //answer < solution
            position = `low`;
        };
    feedback.textContent = `WRONG❗❗ You were『${correctness}%』close. You guessed too ${position}`;
  };
  timeSpent = ((endTime - startTime)/1000);
  if(timeSpent>=60){
    timeSpent = timeSpent/60  //convert to minutes.
    time = `mins.`
  }
  else{
    time = `secs.`
  };
  document.getElementById(`timeSpent`).textContent = `🕑️Time spent: ${timeSpent.toFixed(2)} ${time}`;
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


//Program starts here
document.getElementById(`numOfDigits`).value = 2;
document.getElementById(`numOfRows`).value = 2;
generateNum(numArray);   //Generate random numbers and store in an array
writeDivToDOM();         //Load random numbers in browser as div
acceptUserInput();       //Load user input section in browser
startTime = Date.now();//start measuring time


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

document.getElementById(`answer`).oninput = function(){
        this.value = this.value.replace(/[^0-9,-]/g, ``);
        endTime = Date.now();//stop measuring time
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
                solution *= numArray[i];     //sum up the numbers
            };
        }
        else if (operator == `^`){
            console.log(`operator = ${operator}`);
        }
        else if (operator == `?`){
            alert(`Please select an Operator from the dropdown menu.`);
        }
        
        console.log(``);    //For debugging purposes
        console.log(`numArray: ${numArray}`); //For debugging purposes
        console.log(`ans: ${answer}, soln: ${solution}`); //For debugging purposes

        if (answer === solution){
            changeNumsAndOperatorInDOM();        //Replace the number on screen with new numbers
            document.getElementById(`answer`).value = ``; //clear input textbox after hitting enter key
            startTime = Date.now();//start measuring time
        }
        //giveFeedback();
};

document.getElementById(`saveChangesBtn`).onclick = function(){
    changeNumsAndOperatorInDOM();
    document.getElementById(`feedback`).textContent = ``;
    document.getElementById(`timeSpent`).textContent = ``;
};

document.getElementById(`hamburger-icon`).onclick = function(){
    let sidebar = document.querySelector(`#sidebar`) as HTMLDivElement;
    sidebar.classList.toggle(`translate-x-0`);
    sidebar.classList.toggle(`-translate-x-full`);
};

document.getElementById(`settings-icon`).onclick = function(){
    let settingsSidebar = document.querySelector(`#settings-sidebar`) as HTMLDivElement;
    settingsSidebar.classList.toggle(`translate-x-0`);
    settingsSidebar.classList.toggle(`translate-x-full`);
};


