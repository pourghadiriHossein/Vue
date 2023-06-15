var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Person.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    Person.prototype.describe = function () {
        return "This is ".concat(this.firstName, " ").concat(this.lastName, ".");
    };
    return Person;
}());
// class Employee extends Person {
//     //..
// }
var Employee1 = /** @class */ (function (_super) {
    __extends(Employee1, _super);
    function Employee1(firstName, lastName, jobTitle) {
        var _this = 
        // call the constructor of the Person class:
        _super.call(this, firstName, lastName) || this;
        _this.jobTitle = jobTitle;
        return _this;
    }
    return Employee1;
}(Person));
var employee1 = new Employee1('John', 'Doe', 'Front-end Developer');
var employee2 = new Employee1('John', 'Doe', 'Web Developer');
console.log(employee1.getFullName());
console.log(employee2.describe());
// Output:
// John Doe
// This is John Doe.
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(firstName, lastName, jobTitle) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.jobTitle = jobTitle;
        return _this;
    }
    Employee2.prototype.describe = function () {
        return _super.prototype.describe.call(this) + "I'm a ".concat(this.jobTitle, ".");
    };
    return Employee2;
}(Person));
var employee3 = new Employee2('John', 'Doe', 'Web Developer');
console.log(employee3.describe());
// Output:
// This is John Doe.I'm a Web Developer.
