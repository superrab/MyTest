"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * A custom grid control that generates its headers and rows dynamically based on the data type / data.
 */
var RlhGrid = (function (_super) {
    __extends(RlhGrid, _super);
    function RlhGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gridID = "aGrid";
        /**
         * Specify which columns should not be shown
         */
        _this.hideCols = [];
        return _this;
    }
    RlhGrid.prototype.render = function (afterRender) {
        var el = this.containerElement; // have to create a closure for this
        el.innerText = "Loading...";
        el.innerHTML = this.getHtml();
        if (afterRender) {
            afterRender();
        }
    };
    RlhGrid.prototype.getHtml = function () {
        var ret = "";
        if (!this.data || this.data.length < 1)
            return "No data";
        ret += "<div id=\"" + this.gridID + "\">";
        //HEADER
        ret += "<div class=\"row\">";
        for (var datumProp in this.data[0]) {
            if (this.hideCols.indexOf(datumProp.toString()) > -1)
                continue; // don't draw this header if it's in hidecols
            ret += "<div class=\"col-md-2\">";
            // if ((<any>datum).hasOwnProperty()) {
            // }
            ret += datumProp.toString();
            ret += "</div>";
        }
        ret += "</div>";
        //DATA
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var datum = _a[_i];
            ret += "<div class=\"row\">";
            for (var datumVal in this.data[0]) {
                if (this.hideCols.indexOf(datumVal.toString()) > -1)
                    continue; // hide col if in hidecols
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
    };
    return RlhGrid;
}(PartialDynamicBase));
