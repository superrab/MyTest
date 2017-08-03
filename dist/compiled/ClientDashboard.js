"use strict";
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
var ClientDashboard = (function (_super) {
    __extends(ClientDashboard, _super);
    function ClientDashboard(containerElement) {
        var _this = _super.call(this, containerElement) || this;
        _this.URL = "partials\\dashboard.html";
        _this.partialURL = _this.URL;
        return _this;
    }
    return ClientDashboard;
}(PartialBase));
function doRegister() {
    var name = $("#txtName").val();
    var pwd = $("#txtPassword").val();
    console.log("Register: " + name + " : " + pwd);
    $("#msgBar").text("Register: " + name + " : " + pwd);
}
;
function doLogin() {
    var name = $("#txtName").val();
    var pwd = $("#txtPassword").val();
    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);
    // request login page
    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render();
}
;
