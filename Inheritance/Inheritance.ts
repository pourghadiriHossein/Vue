class Person {
    constructor(private firstName: string, private lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    describe(): string {
        return `This is ${this.firstName} ${this.lastName}.`;
    }
}


// class Employee extends Person {
//     //..
// }

class Employee1 extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {
        
        // call the constructor of the Person class:
        super(firstName, lastName);
    }
}

let employee1 = new Employee1('John','Doe','Front-end Developer');

let employee2 = new Employee1('John', 'Doe', 'Web Developer');

console.log(employee1.getFullName());
console.log(employee2.describe());


// Output:

// John Doe
// This is John Doe.

class Employee2 extends Person {
    constructor(
        firstName: string,
        lastName: string,
        private jobTitle: string) {

        super(firstName, lastName);
    }

    describe(): string {
        return super.describe() + `I'm a ${this.jobTitle}.`;
    }
}


let employee3 = new Employee2('John', 'Doe', 'Web Developer');
console.log(employee3.describe());

// Output:

// This is John Doe.I'm a Web Developer.