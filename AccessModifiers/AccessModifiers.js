// class Person {
//     private ssn: string;
//     private firstName: string;
//     private lastName: string;
//     // ...
// }
var Person1 = /** @class */ (function () {
    function Person1(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person1.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person1;
}());
var person = new Person1('153-07-3130', 'John', 'Doe');
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
var Person2 = /** @class */ (function () {
    function Person2(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person2.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person2;
}());
var person2 = new Person2('65489498', 'hossein', 'pourghadiri');
console.log(person2);
console.log(person2.ssn);
console.log(person2.firstName);
console.log(person2.lastName);
