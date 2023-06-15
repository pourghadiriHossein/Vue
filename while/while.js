// while(condition) {
//     // do something
// }
// while(condition) {
//     // do something
//     // ...
//     if(anotherCondition) 
//         break;
// }
var counter = 0;
while (counter < 5) {
    console.log(counter);
    counter++;
}
// Output:
// 0
// 1
// 2
// 3
// 4
var list = document.querySelector('#list');
while (list.firstChild) {
    console.log(list.firstChild);
    list.removeChild(list.firstChild);
}
