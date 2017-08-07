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
    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);
    loadDashboard();
}
;
function loadDashboard() {
    // Get product data from server
    var productData = [];
    console.log("Trying to get products");
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
    var afterLoadGrid = function () {
        renderGrid(productData, $("#gridContainer")[0]);
    };
    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render(afterLoadGrid);
}
;
/**
 * Refresh the product grid without reloading the partial
 */
function refreshGrid() {
    // Get product data from server
    var productData = [];
    console.log("Trying to get products");
    var productRequest = $.getJSON("products", function (data, textStatus, jqXHR) {
        if (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var d = data_2[_i];
                // OF: Values
                // IN: Keys
                console.log("Prod Found: " + d.id + " : " + d.name);
            }
            productData = data;
            renderGrid(productData, $("#gridContainer")[0]);
        }
        else {
            console.log("No products on server");
        }
    });
}
;
function renderGrid(data, gridElement) {
    var grid = new RlhGrid(gridElement);
    grid.data = data;
    grid.render(function () { });
}
function insertProduct() {
}
;
function deleteProduct() {
    var msgBar = $("#dashboardMsg")[0];
    var txtProdID = $("#txtID")[0];
    $.ajax({
        url: 'products/' + txtProdID.value,
        type: 'DELETE',
        success: function (result) {
            msgBar.innerText = result;
        }
    });
    refreshGrid(); // this will wipe out the msg bar with a complete reload of the partial
}
;
