// json may come from a third-party API
const json = `{"latitude": 10.11, "longitude":12.12}`;

// parse JSON to find location
const currentLocation = JSON.parse(json);
console.log(currentLocation);


// { latitude: 10.11, longitude: 12.12 }


console.log(currentLocation.x);


// undefined


let result1;

console.log(result1);


let result2: any;
result2 = 10.123;
console.log(result2.toFixed());
result2.willExist(); //


let result3: object;
result3 = 10.123;
result3.toFixed();
console.log(result3);


// error TS2339: Property 'toFixed' does not exist on type 'object'.