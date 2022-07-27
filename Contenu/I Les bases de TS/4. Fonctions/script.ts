function multiply(num1 : number, num2 = 10, action?: string)   {
    if(action) console.log(action);
    return num1 * num2;
}
console.log(multiply(6,10,"create"));


let foo: Function;

foo = () => {}


// Function signatures
let baz: (a: number, b:number) => number;

baz = (a,b) => a + b;


// Callback
function greetings(fn: (a: string) => void) {
    fn("Hello World")
}

function printToConsole(msg: string) {
    console.log(msg);
}

greetings(printToConsole)