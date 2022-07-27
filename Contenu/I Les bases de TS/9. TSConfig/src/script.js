"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var arr = [1, 2, 3];
var newArr = __spreadArray(__spreadArray([], arr, true), [4, 5, 6], false);
console.log(newArr);
// const pNodelist = document.querySelectorAll('p')
// const arrFromNodeList = [...pNodelist]
var text = "abc";
var strictVar = 10;
