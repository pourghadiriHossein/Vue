var skill1;
skill1 = ['Programming', 5];
console.log(skill1);
var skill2;
skill2 = [5, 'Programming'];
console.log(skill2);
// error TS2322: Type 'string' is not assignable to type 'number'.
// (r,g,b)
var color = [255, 0, 0];
var bgColor, headerColor;
bgColor = [0, 255, 255, 0.5];
headerColor = [0, 255, 255];
console.log(bgColor);
console.log(headerColor);
