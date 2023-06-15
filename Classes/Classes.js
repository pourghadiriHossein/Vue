function Person1(ssn, firstName, lastName) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
}
Person1.prototype.getFullName = function () {
    return "".concat(this.firstName, " ").concat(this.lastName);
};
var person1 = new Person1('171-28-0926', 'John', 'Doe');
console.log(person1.getFullName());
// John Doe
var Person2 = /** @class */ (function () {
    function Person2(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person2;
}());
var person2 = new Person2('458-26-14', 'hossein', 'pourghadiri');
console.log(person2);
var Person3 = /** @class */ (function () {
    function Person3(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person3.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person3;
}());
var person3 = new Person3('171-28-0926', 'John', 'Doe');
console.log(person3.getFullName());
var Person4 = /** @class */ (function () {
    function Person4(ssn, firstName, lastName) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person4.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person4;
}());
var person4 = new Person4(171280926, 'John', 'Doe');
console.log(person4.getFullName());
