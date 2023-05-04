//import {evaluateExpression} from './utils.js';

const elementKeys = document.querySelectorAll(".key");
const elementNumDisplay = document.querySelector(".display");
const elementOperators = document.querySelectorAll(".operator");
const listOperatorsType1 = ["+", "-"];
const listOperatorsType2 = ["x", "÷", "*", "/"];
let keyValuePrevious = "";
let keyValueCurrent = "";

let number1=""; 
let operator1="";
let number2="";
let operator2=""; 
let number3="";
let ExpressionType2="";
let Expression = "";
let _number1=number1; 
let _operator1=operator1;
let _number2=number2;
let _operator2=operator2; 
let _number3=number3;


//functions
function resetVariables(){
    keyValuePrevious = "";
    keyValueCurrent = "";

    number1=""; 
    operator1="";
    number2="";
    operator2=""; 
    number3="";
    ExpressionType2="";
    Expression = "";
    _number1=number1; 
    _operator1=operator1;
    _number2=number2;
    _operator2=operator2; 
    _number3=number3;
}


function storePreviousExpressionVarible(){
    _number1=number1; 
    _operator1=operator1;
    _number2=number2;
    _operator2=operator2; 
    _number3=number3;
}
function reStorePreviousExpressionVarible(){
    number1=_number1; 
    operator1=_operator1;
    number2=_number2;
    operator2=_operator2; 
    number3=_number3;
}
function replaceOperator(operator){
    if(operator==="x") {return '*';}
    else if (operator === "÷") {return '/';}
    else {return operator;}
}
function updateExpressionType1() {
    Expression = `${number1} ${operator2} ${number3}`;
}

function updateExpressionType2() {
    Expression = `${number1} ${operator1} ${ExpressionType2} ${number3}`;
}


function resetOperator1AndNumber2() {
    operator1="";
    number2="";
}

//Add event listener based on each click in the calculator
elementKeys.forEach (function (key) {
    key.addEventListener("click", function(event){
        let keyValue = event.target.innerText;
        if (keyValue !== "←"){
        elementOperators.forEach (function (operator) {operator.classList.remove('operatorPressed'); });
        }
       //if key value is a number 
        if(Number(keyValue)>=0) {
            keyValuePrevious = keyValueCurrent;
            keyValueCurrent = keyValue;
            if (elementNumDisplay.innerText == 0 || keyValuePrevious === "=" || listOperatorsType1.includes(keyValuePrevious)|| listOperatorsType2.includes(keyValuePrevious)) {
                    elementNumDisplay.innerText = keyValue;
                    if (keyValuePrevious === "=") {
                        resetVariables();
                        console.log('reset');
                    }
            }
            else {  elementNumDisplay.innerText += keyValue;}
            if (listOperatorsType2.includes(operator2)) {
                number2=number3;
                console.log (`N2=N3 = ${number2}`);
            }
            
        }         

        //if keyValue is C, then clear number
        else if (keyValue === "C") {
            elementNumDisplay.innerText = 0;
            resetVariables();
        } 
        //if keyValue is <-, then remove last number
        else if (keyValue === "←") { 
            keyValuePrevious = keyValueCurrent;
            keyValueCurrent = keyValue;
            //if(listOperatorsType1.includes(keyValuePrevious)|| listOperatorsType2.includes(keyValuePrevious)) {}
            //else {
                if(elementNumDisplay.innerText.length===1){elementNumDisplay.innerText=0;}
                if(elementNumDisplay.innerText.length>1){elementNumDisplay.innerText = elementNumDisplay.innerText.substring(0, elementNumDisplay.innerText.length-1)}
            //} 
        }      
            
        //if KeyValue is a operator or =
        if(listOperatorsType1.includes(keyValue)|| listOperatorsType2.includes(keyValue) || keyValue === "="){
            //change button color change after operator is pressed
            if(keyValue !== "=" ) {  key.classList.add('operatorPressed');}
            //previous operator is not an operator + - * / or the current value pressed is equal
            if( (listOperatorsType1.includes(keyValueCurrent) === false && listOperatorsType2.includes(keyValueCurrent) === false)  || keyValue === "=") {
                keyValuePrevious = keyValueCurrent;
                keyValueCurrent = keyValue;
                storePreviousExpressionVarible();
            } //when user switch operator: press different operator in a row
                else if (listOperatorsType1.includes(keyValueCurrent) || listOperatorsType2.includes(keyValueCurrent) ){
                console.log ('switch operator, ignore the previous one');
                keyValueCurrent = keyValue;
                reStorePreviousExpressionVarible();
            }
            number3 = elementNumDisplay.innerText;
            if (listOperatorsType1.includes(keyValueCurrent) || keyValueCurrent === "="){
                
                if(listOperatorsType2.includes(operator2)) {updateExpressionType2();}
                else {updateExpressionType1();}
                number1=eval(Expression);
                console.log(`${Expression} = ${number1}`);
                elementNumDisplay.innerText=number1;
                resetOperator1AndNumber2();
            } else {
                 if(ExpressionType2===""){operator1= replaceOperator(operator2);}
                 ExpressionType2 = `${ExpressionType2} ${number3} ${replaceOperator(keyValue)}`;
                }
            operator2 = replaceOperator(keyValue);
            if (keyValue === "=") {
                console.log (`Equal pressed!`);
                resetVariables();
                keyValueCurrent = keyValue;
            }
        }
        
    }); 
 });
        
 //supporting functions