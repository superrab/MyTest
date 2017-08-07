/**
 * Base class for IPartials that load from a static HTML file location
 */
class PartialBase implements IPartial {
    public containerElement : HTMLElement;
    protected partialURL : string;

    public constructor(containerElement: HTMLElement) {
        this.containerElement = containerElement;
    }

    public render(afterRender?: () => void) : void {
        //Load the login screen
        var el : HTMLElement = this.containerElement; // have to create a closure for this

        el.innerText = "Trying to get partial...";
        var xhr : XMLHttpRequest = $.get(this.partialURL, function(data: any, textStatus: string, jqXHR: JQueryXHR) : any {
            // var msg : string = "data: " + data + ", textStatus: " + textStatus;
            el.innerHTML = data;

            if (afterRender) {
                afterRender();
            }
        });
    }
}