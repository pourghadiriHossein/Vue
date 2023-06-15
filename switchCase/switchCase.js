// switch ( expression ) {
//     case value1:
//         // statement 1
//         break;
//     case value2:
//         // statement 2
//         break;
//     case valueN:
//         // statement N
//         break;
//     default: 
//         // 
//         break;
//  }
var targetId = 'btnDelete';
switch (targetId) {
    case 'btnUpdate':
        console.log('Update');
        break;
    case 'btnDelete':
        console.log('Delete');
        break;
    case 'btnNew':
        console.log('New');
        break;
}
// Output: Delete
// change the month and year
var month = 2, year = 2020;
var day = 0;
switch (month) {
    case 1:
    case 2:
        // leap year
        if (((year % 4 == 0) &&
            !(year % 100 == 0))
            || (year % 400 == 0))
            day = 29;
        else
            day = 28;
        break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
        day = 30;
        break;
    case 12:
        day = 31;
        break;
    default:
        throw Error('Invalid month');
}
console.log("The month ".concat(month, " in ").concat(year, " has ").concat(day, " days"));
// Output: The month 2 in 2020 has 29 days
