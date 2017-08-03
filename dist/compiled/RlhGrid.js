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
 * A grid
 */
var RlhGrid = (function (_super) {
    __extends(RlhGrid, _super);
    function RlhGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gridID = "aGrid";
        return _this;
    }
    RlhGrid.prototype.render = function (afterRender) {
        var el = this.containerElement; // have to create a closure for this
        el.innerText = "Loading...";
        el.innerHTML = this.getHtml();
        afterRender();
    };
    RlhGrid.prototype.getHtml = function () {
        var ret = "";
        if (!this.data || this.data.length < 1)
            return "No data";
        ret += "<div class=\"container\" id=\"" + this.gridID + "\">";
        //HEADER
        ret += "<div class=\"row\">";
        for (var datumProp in this.data[0]) {
            ret += "<div class=\"col-md-2\">";
            // if ((<any>datum).hasOwnProperdddty()) {
            // }
            ret += datumProp.toString();
            ret += "</div>";
        }
        ret += "</div>";
        //DATA
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var datum = _a[_i];
            ret += "<div class=\"row\">";
            for (var datumVal in datum) {
                ret += "<div class=\"col-md-2\">";
                // if ((<any>datum).hasOwnProperdddty()) {
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
