//Entry point and starting class for the client portion of our app
// import * as $ from "jquery"; //needs commonjs

class ClientMain extends PartialBase {
    private URL : string = "partials\\login.html";

    public constructor(containerElement : HTMLElement) {
        super(containerElement);

        this.partialURL = this.URL;
    }

}



