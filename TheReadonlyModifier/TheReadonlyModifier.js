var Person1 = /** @class */ (function () {
    function Person1(birthDate) {
        this.birthDate = birthDate;
    }
    return Person1;
}());
var person1 = new Person1(new Date(1990, 12, 25));
console.log('befor assign Date');
console.log(person1);
console.log(person1.birthDate);
person1.birthDate = new Date(1991, 12, 25); // Compile error
console.log('after assign Date');
console.log(person1);
console.log(person1.birthDate);
var Person2 = /** @class */ (function () {
    function Person2(birthDate) {
        this.birthDate = birthDate;
        this.birthDate = birthDate;
    }
    return Person2;
}());
var person2 = new Person2(new Date(1994, 3, 27));
console.log('person 2: ');
console.log(person2);
console.log(person2.birthDate);
