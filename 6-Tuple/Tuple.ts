let skill1: [string, number];
skill1 = ['Programming', 5];

console.log(skill1);


let skill2: [string, number];
skill2 = [5, 'Programming'];

console.log(skill2);


// error TS2322: Type 'string' is not assignable to type 'number'.

// (r,g,b)


let color: [number, number, number] = [255, 0, 0];


let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];
headerColor = [0, 255, 255];

console.log(bgColor);
console.log(headerColor);


