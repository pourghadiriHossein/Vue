for (let index1 = 0; index1 < 9; index1++) {
    
    // if index is odd, skip it
    if (index1 % 2)
        continue;

    // the following code will be skipped for odd numbers
    console.log(index1);
}



// Output:

// 0
// 2
// 4
// 6
// 8

let index2 = -1;

while (index2 < 9) {

    index2 = index2 + 1;

    if (index2 % 2)
        continue;

    console.log(index2);
}


// Output:

// 0
// 2
// 4
// 6
// 8   


let index3 = 9;
let count3 = 0;

do {
    index3 += 1;

    if (index3 % 2)
        continue;
    count3 += 1;
} while (index3 < 99);


console.log(count3); // 45

