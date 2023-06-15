var Employee1 = /** @class */ (function () {
    function Employee1(firstName, lastName, jobTitle) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        Employee1.headcount++;
    }
    Employee1.headcount = 0;
    return Employee1;
}());
var john1 = new Employee1('John', 'Doe', 'Front-end Developer');
var jane1 = new Employee1('Jane', 'Doe', 'Back-end Developer');
console.log(Employee1.headcount); // 2
var Employee2 = /** @class */ (function () {
    function Employee2(firstName, lastName, jobTitle) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
        Employee2.headcount++;
    }
    Employee2.getHeadcount = function () {
        return Employee2.headcount;
    };
    Employee2.headcount = 0;
    return Employee2;
}());
var john2 = new Employee2('John', 'Doe', 'Front-end Developer');
var jane2 = new Employee2('Jane', 'Doe', 'Back-end Developer');
console.log(Employee2.getHeadcount); // 2
