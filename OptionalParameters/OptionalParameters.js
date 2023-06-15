function multiply1(a, b, c) {
    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}
console.log(multiply1(5, 6));
console.log(multiply1(5, 6, 7));
console.log(multiply1(5, 6, undefined));
function multiply2(a, b, c) {
    if (typeof c !== 'undefined') {
        return a * b * c;
    }
    return a * b;
}
// error TS1016: A required parameter cannot follow an optional parameter.
console.log(multiply2(2, 3));
console.log(multiply2(2, 3, 4));
console.log(multiply2(2, 3, undefined));
console.log(multiply2(2, undefined, 4));
