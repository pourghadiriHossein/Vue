// let variableName: type;
// let variableName: type = value;
// const constantName: type = value;
var counter1;
counter1 = 1;
// let counter1: number = 1;
var counter2;
// counter2 = 'Hello'; // compile error 
// Type '"Hello"' is not assignable to type 'number'.
var name3 = 'John';
var age3 = 25;
var active3 = true;
// let arrayName: type[];
var names = ['John', 'Jane', 'Peter', 'David', 'Mary'];
var person;
person = {
    name: 'John',
    age: 25
}; // valid
var greeting;
greeting = function (name) {
    return "Hi ".concat(name);
};
