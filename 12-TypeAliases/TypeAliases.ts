// type alias = existingType;

type chars = string;
let messsage: chars = ''; // same as string type

console.log(typeof(messsage));


type alphanumeric = string | number;
let input: alphanumeric = 1;
console.log(typeof(input));

input = 100; // valid
console.log(input);

input = 'Hi'; // valid
console.log(input);

input = false; // Compiler error
console.log(input);
