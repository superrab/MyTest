"use strict";
//Entry point and starting class for the client portion of our app
// import * as $ from "jquery"; //needs commonjs
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ClientMain = (function (_super) {
    __extends(ClientMain, _super);
    function ClientMain(containerElement) {
        var _this = _super.call(this, containerElement) || this;
        _this.URL = "partials\\login.html";
        _this.partialURL = _this.URL;
        return _this;
    }
    // public render() {
    //     //Load the login screen
    //     var el : HTMLElement = containerElement; // have to create a closure for this
    //     el.innerText = "Trying to get partial...";
    //     var xhr : XMLHttpRequest = $.get(this.LOGIN_URL, function(data: any, textStatus: string, jqXHR: JQueryXHR) : any {
    //         // var msg : string = "data: " + data + ", textStatus: " + textStatus;
    //         el.innerHTML = data;
    //     });
    // }
    ClientMain.prototype.printMe = function () {
        return "ClientMain loaded";
    };
    return ClientMain;
}(PartialBase));
