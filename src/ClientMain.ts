//Entry point and starting class for the client portion of our app
// import * as $ from "jquery"; //needs commonjs

class ClientMain implements IPartial {
    private URL : string = "partials\\login.html";

    public containerElement : HTMLElement;

    public constructor(containerElement : HTMLElement) {
        this.containerElement = containerElement;    
    }

    public render() {
        //Load the login screen
        var el : HTMLElement = this.containerElement; // have to create a closure for this

        el.innerText = "Trying to get partial...";
        var xhr : XMLHttpRequest = $.get(this.URL, function(data: any, textStatus: string, jqXHR: JQueryXHR) : any {
            // var msg : string = "data: " + data + ", textStatus: " + textStatus;
            el.innerHTML = data;
        });
    }

    public printMe(): string {
        return "ClientMain loaded";
    }
}



window.onload = (ev : Event) => {
    var containerElement : HTMLElement = <HTMLElement>document.getElementById("container");
    var partial : IPartial = new ClientMain(containerElement);

    partial.render();
};