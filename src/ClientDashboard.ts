/**
 * Dasbhoard page with grid
 */
class ClientDashboard extends PartialBase {
    private URL : string = "partials\\dashboard.html";

    public constructor(containerElement : HTMLElement) {
        super(containerElement);

        this.partialURL = this.URL;
    }
}