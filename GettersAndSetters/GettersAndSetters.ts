class Person1 {
    public age: number;
    public firstName: string;
    public lastName: string;
}


let person1 = new Person1();
person1.age = 26;
console.log('person 1 befor insert input age: ');
console.log(person1.age);

let inputAge1 = 32;
person1.age = inputAge1;
console.log('person 1 after insert input age: ');
console.log(person1.age);

if( inputAge1 > 0 && inputAge1 < 200 ) {
    person1.age = inputAge1;
}
console.log('person 1 after insert input age by if condition: ');
console.log(person1.age);

class Person2 {
    private _age: number;
    private _firstName: string;
    private _lastName: string;

 
    public get age() {
        return this._age;
    }

    public set age(theAge: number) {
        if (theAge <= 0 || theAge >= 200) {
            throw new Error('The age is invalid');
        }
        this._age = theAge;
    }

    public getFullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
}

console.log('create and change age: from 10 to 0:');

let person2 = new Person2();
person2.age = 10;
console.log('age input is 10: ');

console.log(person2.age);

// person2.age = 0;
// console.log('age input is 0: ');
// console.log(person2.age);

// Error: The age is invalid


class Person3 {
    private _age: number;
    private _firstName: string;
    private _lastName: string;

    public get age() {
        return this._age;
    }

    public set age(theAge: number) {
        if (theAge <= 0 || theAge >= 200) {
            throw new Error('The age is invalid');
        }
        this._age = theAge;
    }

    public get firstName() {
        return this._firstName;
    }

    public set firstName(theFirstName: string) {
        if (!theFirstName) {
            throw new Error('Invalid first name.');
        }
        this._firstName = theFirstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public set lastName(theLastName: string) {
        if (!theLastName) {
            throw new Error('Invalid last name.');
        }
        this._lastName = theLastName;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
console.log('test full getter and setter: ');
let person3 = new Person3();
person3.age = 45;
person3.firstName = 'hossein';
person3.lastName = 'pourghadiri';
console.log(person3.getFullName());
console.log(person3.age);
console.log(person3.firstName);
console.log(person3.lastName);



class Person4 {
    // ... other code 
    public get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    public set fullName(name: string) {
        let parts = name.split(' ');
        if (parts.length != 2) {
            throw new Error('Invalid name format: first last');
        }
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
}


let person5 = new Person4();
person5.fullname = 'John Doe';

console.log(person5.fullName);

