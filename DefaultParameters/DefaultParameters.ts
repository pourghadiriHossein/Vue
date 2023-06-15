// function name(parameter1=defaultValue1,...) {
//     // do something
//  }


function applyDiscount1(price, discount = 0.05) {
    return price * (1 - discount);
}

console.log(applyDiscount1(100)); // 95




// function name(parameter1:type=defaultvalue1, parameter2:type=defaultvalue2,...) {
//     //
//  }


 function applyDiscount2(price: number, discount: number = 0.05): number {
    return price * (1 - discount);
}

console.log(applyDiscount2(100)); // 95




let promotion: (price: number, discount: number = 0.05) => number;

// error TS2371: A parameter initializer is only allowed in a function or constructor implementation.


function applyDiscount3(price: number, discount: number = 0.05): number {
    // ...
  }

function applyDiscount4(price: number, discount?: number): number {
    // ...
}

(price: number, discount?: number) => number



function getDay(year: number = new Date().getFullYear(), month: number): number {
    let day = 0;
    switch (month) {
        case 1:
        case 2:
            // leap year
            if (((year % 4 == 0) &&
                !(year % 100 == 0))
                || (year % 400 == 0))
                day = 29;
            else
                day = 28;
            break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            day = 30;
            break;
        case 12:
            day = 31;
            break;
        default:
            throw Error('Invalid month');
    }
    return day;
}

let day1 = getDay(2019, 2);
console.log(day1); // 28


let day2 = getDay(undefined, 2);
console.log(day2);