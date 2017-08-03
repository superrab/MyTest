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
    var name : string = $("#txtName").val();
    var pwd : string = $("#txtPassword").val();

    // Temp mock data
    var productData : Product[] = [
        { name : "Nintendo", id : 1},
        { name : "Sega", id : 2},
        { name : "Jaguar", id : 3},
    ];

    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);

    // request login page with callback to render the grid
    var loadGrid = function() : void {
        var gridHtmlElement : HTMLElement = $("#gridContainer")[0];
        var grid : RlhGrid<Product> = new RlhGrid<Product>(gridHtmlElement);
        grid.data = productData;
        grid.render(function() {});
    };

    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render(loadGrid)
};