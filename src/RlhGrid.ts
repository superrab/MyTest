/**
 * A custom grid control that generates its headers and rows dynamically based on the data type / data.
 */
class RlhGrid<T> extends PartialDynamicBase {
    public gridID : string = "aGrid";
    public data : T[]; //all data must be the same type

    /**
     * Specify which columns should not be shown
     */
    public hideCols : string[] = [];

    public render(afterRender? : () => void) : void {
        var el : HTMLElement = this.containerElement; // have to create a closure for this
        el.innerText = "Loading...";
        el.innerHTML = this.getHtml();

        if (afterRender) {
            afterRender();
        }
    }

    private getHtml() : string {
        
        var ret : string = "";
        if (!this.data || this.data.length < 1) return "No data";

        ret += "<div id=\"" + this.gridID + "\">";

        //HEADER
        ret += "<div class=\"row\">";
        for (let datumProp in this.data[0]) {
            if (this.hideCols.indexOf(datumProp.toString()) > -1) continue; // don't draw this header if it's in hidecols

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

            for (let datumVal in this.data[0]) { // use the first instance for the ordering of the col values
                if (this.hideCols.indexOf(datumVal.toString()) > -1) continue; // hide col if in hidecols
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