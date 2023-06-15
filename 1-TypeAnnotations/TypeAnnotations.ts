// let variableName: type;
// let variableName: type = value;
// const constantName: type = value;

let counter1: number;
counter1 = 1;

// let counter1: number = 1;

let counter2: number;
// counter2 = 'Hello'; // compile error 

// Type '"Hello"' is not assignable to type 'number'.


let name3: string = 'John';
let age3: number = 25;
let active3: boolean = true;

// let arrayName: type[];

let names: string[] = ['John', 'Jane', 'Peter', 'David', 'Mary'];

let person: {
    name: string;
    age: number
 };
 
 person = {
    name: 'John',
    age: 25
 }; // valid

 let greeting : (name: string) => string;

 greeting = function (name: string) {
    return `Hi ${name}`;
};

