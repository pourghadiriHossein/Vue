var products1 = [
    { name: 'phone', price: 700 },
    { name: 'tablet', price: 900 },
    { name: 'laptop', price: 1200 }
];
for (var i = 0; i < products1.length; i++) {
    if (products1[i].price == 900)
        break;
}
// show the products
console.log(products1[i]);
// Output:
// { name: 'tablet', price: 900 }
var products2 = [
    { name: 'phone', price: 700 },
    { name: 'tablet', price: 900 },
    { name: 'laptop', price: 1200 }
];
var discount = 0;
var product = products2[1];
switch (product.name) {
    case 'phone':
        discount = 5;
        break;
    case 'tablet':
        discount = 10;
        break;
    case 'laptop':
        discount = 15;
        break;
}
console.log("There is a ".concat(discount, "% on ").concat(product.name, "."));
