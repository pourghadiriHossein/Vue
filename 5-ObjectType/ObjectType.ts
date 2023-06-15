let employee1: object;

employee1 = {
    firstName1: 'John',
    lastName1: 'Doe',
    age1: 25,
    jobTitle1: 'Web Developer'
};

console.log(employee1);

// If you reassign a primitive value to the employee object, you’ll get an error :

// employee = "Jane";
// Error:

// error TS2322: Type '"Jane"' is not assignable to type 'object'.


// console.log(employee.hireDate);
// Error:

// error TS2339: Property 'hireDate' does not exist on type 'object'.


let employee2: {
    firstName2: string;
    lastName2: string;
    age2: number;
    jobTitle2: string;
};

employee2 = {
    firstName2: 'John',
    lastName2: 'Doe',
    age2: 25,
    jobTitle2: 'Web Developer'
};

let employee3: {
    firstName3: string;
    lastName3: string;
    age3: number;
    jobTitle3: string;
} = {
    firstName3: 'John',
    lastName3: 'Doe',
    age3: 25,
    jobTitle3: 'Web Developer'
};

// let vacant: {};
// vacant.firstName = 'John';

// error TS2339: Property 'firstName' does not exist on type '{}'.


let vacant: {} = {};

console.log(vacant.toString());