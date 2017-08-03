/**
 * A grid
 */
class RlhGrid<T> extends PartialDynamicBase {
    public gridID : string = "aGrid";
    public data : T[];

    public render(afterRender : () => void) : void {
        var el : HTMLElement = this.containerElement; // have to create a closure for this
        el.innerText = "Loading...";
        el.innerHTML = this.getHtml();

        afterRender();
    }

    private getHtml() : string {
        
        var ret : string = "";
        if (!this.data || this.data.length < 1) return "No data";

        ret += "<div class=\"container\" id=\"" + this.gridID + "\">";

        //HEADER
        ret += "<div class=\"row\">";
        for (let datumProp in this.data[0]) {
            ret += "<div class=\"col-md-2\">";

            // if ((<any>datum).hasOwnProperty()) {
                
            // }

            ret += datumProp.toString();
            ret += "</div>";
        }
        ret += "</div>";

        //DATA
        for (let datum of this.data) {
            ret += "<div class=\"row\">";

            for (let datumVal in datum) {
                ret += "<div class=\"col-md-2\">";

                // if ((<any>datum).hasOwnProperty()) {
                    
                // }

                ret += datum[datumVal];
                ret += "</div>";
            }

            ret += "</div>";
        }

        ret += "</div>";

        return ret;
    }
}