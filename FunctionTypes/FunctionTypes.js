// (parameter: type, parameter:type,...) => type
var add1;
add1 = function (x, y) {
    return x + y;
};
console.log(add1(30, 40));
var add2 = function (x, y) {
    return x + y;
};
add2 = function (x, y) {
    return x.concat(y).length;
};
console.log(add2(20, 40));
