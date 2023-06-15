// for(initialization; condition; expression) {
//     // statement
// }


// for(;;) {
//     // do something
// }


// for(initialization; condition; expression);


for (let i1 = 0; i1 < 10; i1++) {
    console.log(i1);
}

// Output:
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

let i2 = 0;
for (; i2 < 10; i2++) {
    console.log(i2);
}

for (let i3 = 0; ; i3++) {
    console.log(i3);
    if (i3 > 9) break;
}


let i4 = 0;
for (; ;) {
    console.log(i4);
    i4++;
    if (i4 > 9) break;
}

// Output:

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9