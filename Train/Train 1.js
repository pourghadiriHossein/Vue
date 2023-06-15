//operator
let currentString = "";
function division() {
    let operator = " / ";
    currentString += operator;
    show()
}
function multiple() {
    let operator = " * ";
    currentString += operator;
    show()
}
function subtraction() {
    let operator = " - ";
    currentString += operator;
    show()
}
function plus() {
    let operator = " + ";
    currentString += operator;
    show()
}
function modulus() {
    let operator = " % ";
    currentString += operator;
    show()
}
function equal() {
    currentString = eval(currentString);
    currentString = currentString.toString();
    show()
}
//data
function nine() {
    let number = "9";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;    
    show()
}
function eight() {
    let number = "8";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function seven() {
    let number = "7";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function six() {
    let number = "6";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function five() {
    let number = "5";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function four() {
    let number = "4";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function three() {
    let number = "3";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function two() {
    let number = "2";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function one() {
    let number = "1";
    if(currentString.length <= 1 && parseInt(currentString) == 0)
        currentString = number;
    else
        currentString += number;
    show()
}
function zero() {
    let number = "0";
    currentString += number;
    show()
}
function backspace() {
    if(currentString.length <= 1)
        currentString = "0";
    else    
        currentString = currentString.slice(0, currentString.length-1);
    show()    
}
function clean() {
    currentString = "0";
    show();
}
function point() {
    let number = ".";
    currentString += number;
    show()
}
//show
function show() {
    document.getElementById("display").innerHTML = currentString;
}