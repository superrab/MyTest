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
var ClientLogin = (function (_super) {
    __extends(ClientLogin, _super);
    function ClientLogin(containerElement) {
        var _this = _super.call(this, containerElement) || this;
        _this.URL = "partials\\login.html";
        _this.partialURL = _this.URL;
        return _this;
    }
    return ClientLogin;
}(PartialBase));
