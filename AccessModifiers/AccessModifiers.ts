// class Person {
//     private ssn: string;
//     private firstName: string;
//     private lastName: string;
//     // ...
// }

class Person1 {
    private ssn: string;
    private firstName: string;
    private lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
}

let person = new Person1('153-07-3130', 'John', 'Doe');
console.log(person.ssn); //

// class Person {
//     // ...
//     public getFullName(): string {
//         return `${this.firstName} ${this.lastName}`; 
//     }
//     // ...
// }

// class Person {

//     protected ssn: string;
    
//     // other code
// }


class Person2 {
    constructor(protected ssn: string, private firstName: string, private lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
let person2 = new Person2('65489498', 'hossein', 'pourghadiri');
console.log(person2);
console.log(person2.ssn);
console.log(person2.firstName);
console.log(person2.lastName);
