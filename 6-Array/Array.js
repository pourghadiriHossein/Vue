// let arrayName: type[];
var skills1 = [];
skills1[0] = "Problem Solving";
skills1[1] = "Programming";
console.log(skills1);
skills1.push('Software Design');
console.log(skills1);
var skills2 = ['Problem Sovling', 'Software Design', 'Programming'];
var skills3;
skills3 = ['Problem Sovling', 'Software Design', 'Programming'];
// skills.push(100);
// Argument of type 'number' is not assignable to parameter of type 'string'.
var skill4 = skills3[0];
console.log(typeof (skill4));
var series1 = [1, 2, 3];
console.log(series1.length); // 3
var series2 = [1, 2, 3];
var doubleIt = series2.map(function (e) { return e * 2; });
console.log(doubleIt);
// [ 2, 4, 6 ] 
var scores3 = ['Programming', 5, 'Software Design', 4];
var scores4;
scores4 = ['Programming', 5, 'Software Design', 4];
