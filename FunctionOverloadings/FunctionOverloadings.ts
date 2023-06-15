function addNumbers1(a: number, b: number): number {
    return a + b;
}
console.log('Part One');
console.log(addNumbers1(6, 2));


function addStrings2(a: string, b: string): string {
    return a + b;
}
console.log('Part Two');
console.log(addStrings2('test ', 'string'));


function add3(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number')
        return a + b;

    if (typeof a === 'string' && typeof b === 'string')
        return a + b;
}
console.log('Part Three');
console.log(add3(6, 2));
console.log(add3('test ', 'string'));
console.log(add3(5, 'string'));
console.log(add3('test ', 2));


function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
   return a + b;
}
console.log('Part Four');
console.log(add(6, 2));
console.log(add('test ', 'string'));
console.log(add(5, 'string'));
console.log(add('test ', 2));
console.log(add([1, 2], [3, 4]));
console.log(add({}, undefined));


function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
}
console.log('Part Five');
console.log(sum(6, 2));
console.log(sum(6, 2, 10));
console.log(sum(6, 2, undefined));


class Counter {
    private current: number = 0;
    count(): number;
    count(target: number): number[];
    count(target?: number): number | number[] {
        if (target) {
            let values = [];
            for (let start = this.current; start <= target; start++) {
                values.push(start);
            }
            this.current = target;
            return values;
        }
        return ++this.current;
    }
}


let counter = new Counter();
console.log('Part six');
console.log(counter.count()); // return a number
console.log(counter.count(20)); // return an array

// Output:

// 1
// [
//    1,  2,  3,  4,  5,  6,  7,
//    8,  9, 10, 11, 12, 13, 14,
//   15, 16, 17, 18, 19, 20     
// ]