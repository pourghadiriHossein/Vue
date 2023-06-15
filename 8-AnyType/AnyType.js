// json may come from a third-party API
var json = "{\"latitude\": 10.11, \"longitude\":12.12}";
// parse JSON to find location
var currentLocation = JSON.parse(json);
console.log(currentLocation);
// { latitude: 10.11, longitude: 12.12 }
console.log(currentLocation.x);
// undefined
var result1;
console.log(result1);
var result2;
result2 = 10.123;
console.log(result2.toFixed());
result2.willExist(); //
var result3;
result3 = 10.123;
result3.toFixed();
console.log(result3);
// error TS2339: Property 'toFixed' does not exist on type 'object'.
