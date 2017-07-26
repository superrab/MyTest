"use strict";
function getContainer() {
    return $("#container")[0];
}
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
    (new ClientDashboard(getContainer())).render();
}
;
window.onload = function (ev) {
    // var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var containerElement = getContainer();
    var partial = new ClientMain(containerElement);
    partial.render();
};
