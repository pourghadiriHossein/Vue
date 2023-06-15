class Employee1 {
    static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee1.headcount++;
    }
}

let john1 = new Employee1('John', 'Doe', 'Front-end Developer');
let jane1 = new Employee1('Jane', 'Doe', 'Back-end Developer');

console.log(Employee1.headcount); // 2


class Employee2 {
    private static headcount: number = 0;

    constructor(
        private firstName: string,
        private lastName: string,
        private jobTitle: string) {

        Employee2.headcount++;
    }

    public static getHeadcount() {
        return Employee2.headcount;
    }
}


let john2 = new Employee2('John', 'Doe', 'Front-end Developer');
let jane2 = new Employee2('Jane', 'Doe', 'Back-end Developer');

console.log(Employee2.getHeadcount); // 2


