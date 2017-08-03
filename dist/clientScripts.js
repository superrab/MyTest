"use strict";
function getContainer() {
    return $("#container")[0];
}
window.onload = function (ev) {
    // var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var containerElement = getContainer();
    var partial = new ClientLogin(containerElement);
    partial.render();
};
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
function loadGrid() {
    var gridHtmlElement = $("#gridContainer")[0];
    var grid = new RlhGrid(gridHtmlElement);
    grid.data = productData;
    grid.render();
}
// Temp mock data
var productData = [
    { name: "Nintendo", id: 1 },
    { name: "Sega", id: 2 },
    { name: "Jaguar", id: 3 },
];
