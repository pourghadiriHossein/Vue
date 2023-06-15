// let arrayName: type[];


let skills1: string[] = [];


skills1[0] = "Problem Solving";
skills1[1] = "Programming";

console.log(skills1);

skills1.push('Software Design');

console.log(skills1);


let skills2 = ['Problem Sovling','Software Design','Programming'];

let skills3: string[];
skills3 = ['Problem Sovling','Software Design','Programming'];


// skills.push(100);

// Argument of type 'number' is not assignable to parameter of type 'string'.


let skill4 = skills3[0];
console.log(typeof(skill4));



let series1 = [1, 2, 3];
console.log(series1.length); // 3

let series2 = [1, 2, 3];
let doubleIt = series2.map(e => e* 2);
console.log(doubleIt);

// [ 2, 4, 6 ] 

let scores3 = ['Programming', 5, 'Software Design', 4]; 


let scores4 : (string | number)[];
scores4 = ['Programming', 5, 'Software Design', 4]; 