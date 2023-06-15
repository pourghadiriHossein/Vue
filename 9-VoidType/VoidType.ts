function log(message): void {
    console.log(message);
}
// log(onmessage);

let useless: void = undefined;
useless = 1; // error

useless = null; // OK if --strictNullChecks is not specified