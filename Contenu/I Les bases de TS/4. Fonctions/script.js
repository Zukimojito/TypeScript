"use strict";
function multiply(num1, num2, action) {
    if (num2 === void 0) { num2 = 10; }
    if (action)
        console.log(action);
    return num1 * num2;
}
console.log(multiply(6, 10, "create"));
var foo;
foo = function () { };
// Function signatures
var baz;
baz = function (a, b) { return a + b; };
// Callback
function greetings(fn) {
    fn("Hello World");
}
function printToConsole(msg) {
    console.log(msg);
}
greetings(printToConsole);
