"use strict";
var RocketFactory = /** @class */ (function () {
    function RocketFactory(reactors, vMax) {
        this.reactors = reactors;
        this.vMax = vMax;
    }
    RocketFactory.prototype.takeOff = function () {
        console.log("TAKE OFF");
    };
    return RocketFactory;
}());
var rocket1 = new RocketFactory(12, 800);
console.log(rocket1);
rocket1.takeOff();
