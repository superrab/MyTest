"use strict";
//Entry point and starting class for the client portion of our app
// import * as $ from "jquery"; //needs commonjs
var ClientMain = (function () {
    function ClientMain(containerElement) {
        this.URL = "partials\\login.html";
        this.containerElement = containerElement;
    }
    ClientMain.prototype.render = function () {
        //Load the login screen
        var el = this.containerElement; // have to create a closure for this
        el.innerText = "Trying to get partial...";
        var xhr = $.get(this.URL, function (data, textStatus, jqXHR) {
            // var msg : string = "data: " + data + ", textStatus: " + textStatus;
            el.innerHTML = data;
        });
    };
    ClientMain.prototype.printMe = function () {
        return "ClientMain loaded";
    };
    return ClientMain;
}());
window.onload = function (ev) {
    var containerElement = document.getElementById("container");
    var partial = new ClientMain(containerElement);
    partial.render();
};
