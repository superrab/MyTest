"use strict";
var Greeter = (function () {
    function Greeter(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Greeter.prototype.printMe = function () {
        return this.firstName + " : " + this.lastName;
    };
    return Greeter;
}());
// var user = "Jane User";
// document.body.innerHTML = greeter(user);
window.onload = function (ev) {
    var newGreeter = new Greeter("R", "H");
    alert(newGreeter.printMe());
};
