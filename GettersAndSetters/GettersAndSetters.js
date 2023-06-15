var Person1 = /** @class */ (function () {
    function Person1() {
    }
    return Person1;
}());
var person1 = new Person1();
person1.age = 26;
console.log('person 1 befor insert input age: ');
console.log(person1.age);
var inputAge1 = 32;
person1.age = inputAge1;
console.log('person 1 after insert input age: ');
console.log(person1.age);
if (inputAge1 > 0 && inputAge1 < 200) {
    person1.age = inputAge1;
}
console.log('person 1 after insert input age by if condition: ');
console.log(person1.age);
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    Object.defineProperty(Person2.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (theAge) {
            if (theAge <= 0 || theAge >= 200) {
                throw new Error('The age is invalid');
            }
            this._age = theAge;
        },
        enumerable: false,
        configurable: true
    });
    Person2.prototype.getFullName = function () {
        return "".concat(this._firstName, " ").concat(this._lastName);
    };
    return Person2;
}());
console.log('create and change age: from 10 to 0:');
var person2 = new Person2();
person2.age = 10;
console.log('age input is 10: ');
console.log(person2.age);
// person2.age = 0;
// console.log('age input is 0: ');
// console.log(person2.age);
// Error: The age is invalid
var Person3 = /** @class */ (function () {
    function Person3() {
    }
    Object.defineProperty(Person3.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (theAge) {
            if (theAge <= 0 || theAge >= 200) {
                throw new Error('The age is invalid');
            }
            this._age = theAge;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person3.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (theFirstName) {
            if (!theFirstName) {
                throw new Error('Invalid first name.');
            }
            this._firstName = theFirstName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person3.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (theLastName) {
            if (!theLastName) {
                throw new Error('Invalid last name.');
            }
            this._lastName = theLastName;
        },
        enumerable: false,
        configurable: true
    });
    Person3.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    return Person3;
}());
console.log('test full getter and setter: ');
var person3 = new Person3();
person3.age = 45;
person3.firstName = 'hossein';
person3.lastName = 'pourghadiri';
console.log(person3.getFullName());
console.log(person3.age);
console.log(person3.firstName);
console.log(person3.lastName);
var Person4 = /** @class */ (function () {
    function Person4() {
    }
    Object.defineProperty(Person4.prototype, "fullName", {
        // ... other code 
        get: function () {
            return "".concat(this.firstName, " ").concat(this.lastName);
        },
        set: function (name) {
            var parts = name.split(' ');
            if (parts.length != 2) {
                throw new Error('Invalid name format: first last');
            }
            this.firstName = parts[0];
            this.lastName = parts[1];
        },
        enumerable: false,
        configurable: true
    });
    return Person4;
}());
var person5 = new Person4();
person5.fullname = 'John Doe';
console.log(person5.fullName);
