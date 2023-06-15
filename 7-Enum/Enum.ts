// enum name {constant1, constant2, ...};

enum Month1 {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
};


function isItSummer(month1: Month1) {
    let isSummer: boolean;
    switch (month1) {
        case Month1.Jun:
        case Month1.Jul:
        case Month1.Aug:
            isSummer = true;
            break;
        default:
            isSummer = false;
            break;
    }
    return isSummer;
}


console.log(isItSummer(Month1.Jun)); // true


console.log(isItSummer(6)); // true


var Month2;
(function (Month2) {
    Month2[Month2["Jan"] = 0] = "Jan";
    Month2[Month2["Feb"] = 1] = "Feb";
    Month2[Month2["Mar"] = 2] = "Mar";
    Month2[Month2["Apr"] = 3] = "Apr";
    Month2[Month2["May"] = 4] = "May";
    Month2[Month2["Jun"] = 5] = "Jun";
    Month2[Month2["Jul"] = 6] = "Jul";
    Month2[Month2["Aug"] = 7] = "Aug";
    Month2[Month2["Sep"] = 8] = "Sep";
    Month2[Month2["Oct"] = 9] = "Oct";
    Month2[Month2["Nov"] = 10] = "Nov";
    Month2[Month2["Dec"] = 11] = "Dec";
})(Month2 || (Month2 = {}));


// {
//     '0': 'Jan', 
//     '1': 'Feb', 
//     '2': 'Mar', 
//     '3': 'Apr', 
//     '4': 'May', 
//     '5': 'Jun', 
//     '6': 'Jul', 
//     '7': 'Aug', 
//     '8': 'Sep', 
//     '9': 'Oct', 
//     '10': 'Nov',
//     '11': 'Dec',
//     Jan: 0,     
//     Feb: 1,     
//     Mar: 2,     
//     Apr: 3,     
//     May: 4,
//     Jun: 5,
//     Jul: 6,
//     Aug: 7,
//     Sep: 8,
//     Oct: 9,
//     Nov: 10,
//     Dec: 11
//   }
console.log(Month2);


enum Month3 {
    Jan = 1,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
};

console.log(Month3);

enum ApprovalStatus {
    draft,
    submitted,
    approved,
    rejected
};
console.log(ApprovalStatus);


const request =  {
    id: 1,
    status: ApprovalStatus.approved,
    description: 'Please approve this request'
};
console.log(request);

if(request.status === ApprovalStatus.approved) {
    // send an email
    console.log('Send email to the Applicant...');
}