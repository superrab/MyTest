function getContainer() : HTMLElement {
    return $("#container")[0];
}

window.onload = (ev : Event) => {
    // var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var containerElement : HTMLElement = getContainer();
    var partial : IPartial = new ClientLogin(containerElement);

    partial.render(function() {});
};

function doRegister() : void {
    var name : string = $("#txtName").val();
    var pwd : string = $("#txtPassword").val();

    console.log("Register: " + name + " : " + pwd);
    $("#msgBar").text("Register: " + name + " : " + pwd);
};

function doLogin() : void {
    let name : string = $("#txtName").val();
    let pwd : string = $("#txtPassword").val();

    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);

    loadDashboard();
};

function loadDashboard() : void {
    // Get product data from server
    let productData : any[] = [];
    console.log("Trying to get products");
    let productRequest : JQueryXHR = $.getJSON("products", function(data: any, textStatus: string, jqXHR: JQueryXHR) : any {

        if (data) {

            for (let d of data) {
                // OF: Values
                // IN: Keys
                console.log("Prod Found: " + d.id + " : " + d.name);
            }

            productData = data;
        } else {
            console.log("No products on server");
        } 

    });

    let afterLoadGrid = function() : void {
        renderGrid(productData, $("#gridContainer")[0]);
    };

    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render(afterLoadGrid);
};

/**
 * Refresh the product grid without reloading the partial
 */
function refreshGrid() : void {
 // Get product data from server
    let productData : any[] = [];

    console.log("Trying to get products");

    let productRequest : JQueryXHR = $.getJSON("products", function(data: any, textStatus: string, jqXHR: JQueryXHR) : any {

        if (data) {

            for (let d of data) {
                // OF: Values
                // IN: Keys
                console.log("Prod Found: " + d.id + " : " + d.name);
            }

            productData = data;

            renderGrid(productData, $("#gridContainer")[0]);
        } else {
            console.log("No products on server");
        } 

    });
};

function renderGrid(data : any, gridElement : HTMLElement) {
    let grid : RlhGrid<any> = new RlhGrid<any>(gridElement);
    grid.hideCols.push("_id");
    grid.data = data;
    grid.render(function() {});

    // Some notes here: I think that the grid really should be rendered on the server side.
    // The only reason we can access RlhGrid here is because I don't 'export' it in the class definition.
    // 'Product' for example is used with 'export' because I needed to use it in the server.js code but that
    // prevents it from being used on the client side without system.js (which introduces design-time errors.)
    // I already removed references to Product from this file and replaced all those instances with <any>.

    // Next time I would probably separate client side controls with server-side model classes OR figure out how to
    // make the imports work on both client and server side with webpack or browserify or something.
}

function insertProduct() : void {
    let msgBar : HTMLElement = $("#dashboardMsg")[0];
    let txtProdID : HTMLInputElement = <HTMLInputElement>$("#txtID")[0];
    let txtProdName : HTMLInputElement = <HTMLInputElement>$("#txtName")[0];

    $.post({
        url: 'products/' + txtProdID.value + '/' + txtProdName.value,
        success: function(result) {
            msgBar.innerText = result;
        }
    });

    refreshGrid(); // this will wipe out the msg bar with a complete reload of the partial
};

function deleteProduct() : void {
    let msgBar : HTMLElement = $("#dashboardMsg")[0];
    let txtProdID : HTMLInputElement = <HTMLInputElement>$("#txtID")[0];

    $.ajax({
        url: 'products/' + txtProdID.value,
        type: 'DELETE',
        success: function(result) {
            msgBar.innerText = result;
        }
    });

    refreshGrid(); // this will wipe out the msg bar with a complete reload of the partial
};