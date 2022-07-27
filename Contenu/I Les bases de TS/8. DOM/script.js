"use strict";
// Type Assertion
// let txt:string;
// txt = "str"
// Assertion
// const form : HTMLFormElement = document.querySelector('form')!
// console.log(form.children);
// Type Casting
var form = document.querySelector('form');
console.log(form.children);
var input = document.querySelector('input');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    console.log("SUBMITTED");
}
window.addEventListener('click', handleClick);
function handleClick(event) {
    console.log(event.clientX, event.clientY);
}
var paragraphsList = document.querySelectorAll('p');
