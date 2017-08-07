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

    // Get product data from server
    let productData : Product[] = [];
    let productRequest : JQueryXHR = $.getJSON("products", function(data: Product[], textStatus: string, jqXHR: JQueryXHR) : any {

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
    
    


    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);

    // request login page with callback to render the grid
    let loadGrid = function() : void {
        let gridHtmlElement : HTMLElement = $("#gridContainer")[0];
        let grid : RlhGrid<Product> = new RlhGrid<Product>(gridHtmlElement);
        grid.data = productData;
        grid.render(function() {});
    };

    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render(loadGrid)
};