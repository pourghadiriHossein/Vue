var counter1;
console.log(counter1);
var counter2 = 0;
console.log(counter2);
var counter3 = 0;
console.log(counter3);
function setCounter(max) {
    if (max === void 0) { max = 100; }
    // ...    
}
function increment1(counter) {
    return ++counter;
}
console.log(increment1(76));
function increment2(counter) {
    return ++counter;
}
console.log(increment2(87));
var items1 = [1, 2, 3, null];
console.log(items1);
var items2 = [0, 1, null, 'Hi'];
console.log(items2);
var arr = [new Date(), new RegExp('\d+')];
console.log(arr);
document.addEventListener('click', function (event) {
    console.log(event.button); // 
});
document.addEventListener('scroll', function (event) {
    console.log(event.button); // compiler error
});
// Property 'button' does not exist on type 'Event'.(2339)
