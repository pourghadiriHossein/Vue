function log(message) {
    console.log(message);
}
log(onmessage);
var useless = undefined;
useless = 1; // error
useless = null; // OK if --strictNullChecks is not specified
