let counter1: number;
console.log(counter1);


let counter2 = 0;
console.log(counter2);


let counter3: number = 0;
console.log(counter3);


function setCounter(max=100) {
    // ...    
}

function increment1(counter: number) {
    return ++counter;
}
console.log(increment1(76));



function increment2(counter: number) : number {
    return ++counter;
}
console.log(increment2(87));


let items1 = [1, 2, 3, null];
console.log(items1);


let items2 = [0, 1, null, 'Hi'];
console.log(items2);


let arr = [new Date(), new RegExp('\d+')];
console.log(arr);


document.addEventListener('click', function (event) {
    console.log(event.button); // 
});




document.addEventListener('scroll', function (event) {
    console.log(event.button); // compiler error
});

// Property 'button' does not exist on type 'Event'.(2339)


