// if(condition) {
//     // if-statement
//  }
var max1 = 100;
var counter1 = 0;
if (counter1 < max1) {
    counter1++;
}
console.log(counter1); // 1
//Output: 1
var max2 = 100;
var counter2 = 100;
if (counter2 < max2) {
    counter2++;
}
console.log(counter2); // 100
//Output:  100
// if(condition) {
//     // if-statements
//  } else {
//    // else statements;
//  }
var max3 = 100;
var counter3 = 100;
if (counter3 < max3) {
    counter3++;
}
else {
    counter3 = 1;
}
console.log(counter3);
//Output:  1
var max4 = 100;
var counter4 = 100;
counter4 < max4 ? counter4++ : counter4 = 1;
console.log(counter4);
var discount5;
var itemCount5 = 11;
if (itemCount5 > 0 && itemCount5 <= 5) {
    discount5 = 5; // 5% discount
}
else if (itemCount5 > 5 && itemCount5 <= 10) {
    discount5 = 10; // 10% discount 
}
else {
    discount5 = 15; // 15%
}
console.log("You got ".concat(discount5, "% discount. "));
//Output:  0
var discount6;
var itemCount6 = 11;
if (itemCount6 > 0 && itemCount6 <= 5) {
    discount6 = 5; // 5% discount
}
else if (itemCount6 > 5 && itemCount6 <= 10) {
    discount6 = 10; // 10% discount 
}
else if (discount6 > 10) {
    discount6 = 15; // 15%
}
else {
    throw new Error('The number of items cannot be negative!');
}
console.log("You got ".concat(discount6, "% discount. "));
