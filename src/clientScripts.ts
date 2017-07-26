function getContainer() : HTMLElement {
    return $("#container")[0];
}

function doRegister() : void {
    var name : string = $("#txtName").val();
    var pwd : string = $("#txtPassword").val();

    console.log("Register: " + name + " : " + pwd);
    $("#msgBar").text("Register: " + name + " : " + pwd);
};

function doLogin() : void {
    var name : string = $("#txtName").val();
    var pwd : string = $("#txtPassword").val();

    console.log("Login: " + name + " : " + pwd);
    $("#msgBar").text("Login: " + name + " : " + pwd);

    // request login page
    (new ClientDashboard(getContainer())).render()
};

window.onload = (ev : Event) => {
    // var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var containerElement : HTMLElement = getContainer();
    var partial : IPartial = new ClientMain(containerElement);

    partial.render();
};