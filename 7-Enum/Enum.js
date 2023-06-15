// enum name {constant1, constant2, ...};
var Month1;
(function (Month1) {
    Month1[Month1["Jan"] = 0] = "Jan";
    Month1[Month1["Feb"] = 1] = "Feb";
    Month1[Month1["Mar"] = 2] = "Mar";
    Month1[Month1["Apr"] = 3] = "Apr";
    Month1[Month1["May"] = 4] = "May";
    Month1[Month1["Jun"] = 5] = "Jun";
    Month1[Month1["Jul"] = 6] = "Jul";
    Month1[Month1["Aug"] = 7] = "Aug";
    Month1[Month1["Sep"] = 8] = "Sep";
    Month1[Month1["Oct"] = 9] = "Oct";
    Month1[Month1["Nov"] = 10] = "Nov";
    Month1[Month1["Dec"] = 11] = "Dec";
})(Month1 || (Month1 = {}));
;
function isItSummer(month1) {
    var isSummer;
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
var Month3;
(function (Month3) {
    Month3[Month3["Jan"] = 1] = "Jan";
    Month3[Month3["Feb"] = 2] = "Feb";
    Month3[Month3["Mar"] = 3] = "Mar";
    Month3[Month3["Apr"] = 4] = "Apr";
    Month3[Month3["May"] = 5] = "May";
    Month3[Month3["Jun"] = 6] = "Jun";
    Month3[Month3["Jul"] = 7] = "Jul";
    Month3[Month3["Aug"] = 8] = "Aug";
    Month3[Month3["Sep"] = 9] = "Sep";
    Month3[Month3["Oct"] = 10] = "Oct";
    Month3[Month3["Nov"] = 11] = "Nov";
    Month3[Month3["Dec"] = 12] = "Dec";
})(Month3 || (Month3 = {}));
;
console.log(Month3);
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus[ApprovalStatus["draft"] = 0] = "draft";
    ApprovalStatus[ApprovalStatus["submitted"] = 1] = "submitted";
    ApprovalStatus[ApprovalStatus["approved"] = 2] = "approved";
    ApprovalStatus[ApprovalStatus["rejected"] = 3] = "rejected";
})(ApprovalStatus || (ApprovalStatus = {}));
;
console.log(ApprovalStatus);
var request = {
    id: 1,
    status: ApprovalStatus.approved,
    description: 'Please approve this request'
};
console.log(request);
if (request.status === ApprovalStatus.approved) {
    // send an email
    console.log('Send email to the Applicant...');
}
