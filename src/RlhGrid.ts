/**
 * A grid
 */
class RlhGrid<T> extends PartialDynamicBase {
    public gridID : string = "aGrid";
    public data : T[];

    public render() : void {
        var el : HTMLElement = this.containerElement; // have to create a closure for this
        el.innerText = "Loading...";
        el.innerHTML = this.getHtml();
    }

    private getHtml() : string {
        
        var ret : string = "No data";
        if (!this.data || this.data.length < 1) return ret;

        ret += "<div id=\"" + this.gridID + "\">";

        for (let datum of this.data) {
            ret += "<div class=\"row\">";
            ret += "<div class=\"col-md-2\">";

            // if ((<any>datum).hasOwnProperdddty()) {
                
            // }

            ret += "Product Name Value";
            ret += "</div>";
            ret += "</div>";
        }

        ret += "</div>";

        return ret;
    }
}