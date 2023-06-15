// function name(parameter: type, parameter:type,...): returnType {
//     // do something
//  }
function add1(a, b) {
    return a + b;
}
var sum = add1('10', '20');
console.log(sum);
// error TS2345: Argument of type '"10"' is not assignable to parameter of type 'number'
function echo(message) {
    console.log(message.toUpperCase());
}
echo('enter your message: ');
function add2(a, b) {
    return a + b;
}
console.log(add2(25, 26));
