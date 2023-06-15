function raiseError(message) {
    throw new Error(message);
}
function reject() {
    return raiseError('Rejected');
}
//  console.log(reject());
var loop = function forever() {
    while (true) {
        console.log('Hello');
    }
};
// console.log(loop());
function fn1(a) {
    if (typeof a === "string") {
        return true;
    }
    else if (typeof a === "number") {
        return false;
    }
}
//   console.log(fn1(5));
//   console.log(fn1('5'));
function fn2(a) {
    if (typeof a === "string") {
        return true;
    }
    else if (typeof a === "number") {
        return false;
    }
    // make the function valid
    return neverOccur();
}
var neverOccur = function () {
    throw new Error('Never!');
};
console.log(fn2(5));
console.log(fn2('5'));
console.log(fn2([1, 2]));
