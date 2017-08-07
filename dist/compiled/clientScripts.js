"use strict";
function getContainer() {
    return $("#container")[0];
}
window.onload = function (ev) {
    // var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var containerElement = getContainer();
    var partial = new ClientLogin(containerElement);
    partial.render(function () { });
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
    // Get product data from server
    var productData = [];
    var productRequest = $.getJSON("products", function (data, textStatus, jqXHR) {
        if (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var d = data_1[_i];
                // OF: Values
                // IN: Keys
                console.log("Prod Found: " + d.id + " : " + d.name);
            }
            productData = data;
        }
        else {
            console.log("No products on server");
        }
    });
    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);
    // request login page with callback to render the grid
    var loadGrid = function () {
        var gridHtmlElement = $("#gridContainer")[0];
        var grid = new RlhGrid(gridHtmlElement);
        grid.data = productData;
        grid.render(function () { });
    };
    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render(loadGrid);
}
;
