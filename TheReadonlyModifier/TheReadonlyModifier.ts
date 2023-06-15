class Person1 {
    readonly birthDate: Date;

    constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }
}

let person1 = new Person1(new Date(1990, 12, 25));
console.log('befor assign Date');
console.log(person1);
console.log(person1.birthDate);

person1.birthDate = new Date(1991, 12, 25); // Compile error
console.log('after assign Date');
console.log(person1);
console.log(person1.birthDate);



class Person2 {
    constructor(readonly birthDate: Date) {
        this.birthDate = birthDate;
    }
}

let person2 = new Person2(new Date(1994, 3, 27));
console.log('person 2: ');
console.log(person2);
console.log(person2.birthDate);


