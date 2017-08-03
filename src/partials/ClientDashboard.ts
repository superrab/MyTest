class ClientDashboard extends PartialBase {
    private URL : string = "partials\\dashboard.html";

    public constructor(containerElement : HTMLElement) {
        super(containerElement);

        this.partialURL = this.URL;
    }
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

    //Send to dashboard on success
    (new ClientDashboard(getContainer())).render()
};