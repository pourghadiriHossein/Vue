function Person1(ssn, firstName, lastName) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
}

Person1.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
}


let person1 = new Person1('171-28-0926','John','Doe');
console.log(person1.getFullName());

// John Doe

class Person2 {
    ssn;
    firstName;
    lastName;

    constructor(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

let person2 = new Person2('458-26-14', 'hossein', 'pourghadiri')
console.log(person2);

class Person3 {
    ssn;
    firstName;
    lastName;

    constructor(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}


let person3 = new Person3('171-28-0926','John','Doe');
console.log(person3.getFullName());


class Person4 {
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}


let person4 = new Person4(171280926, 'John', 'Doe');
console.log(person4.getFullName());
