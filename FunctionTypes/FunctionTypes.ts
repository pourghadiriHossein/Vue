// (parameter: type, parameter:type,...) => type

let add1: (x: number, y: number) => number;

add1 = function (x: number, y: number) {
    return x + y;
};

console.log(add1(30 ,40));


let add2: (a: number, b: number) => number =
    function (x: number, y: number) {
        return x + y;
    };

add2 = function (x: string, y: string): number {
    return x.concat(y).length;
};


console.log(add2(20, 40));


