"use strict";
var PartialBase = (function () {
    function PartialBase(containerElement) {
        this.containerElement = containerElement;
    }
    PartialBase.prototype.render = function () {
        //Load the login screen
        var el = this.containerElement; // have to create a closure for this
        el.innerText = "Trying to get partial...";
        var xhr = $.get(this.partialURL, function (data, textStatus, jqXHR) {
            // var msg : string = "data: " + data + ", textStatus: " + textStatus;
            el.innerHTML = data;
        });
    };
    return PartialBase;
}());
