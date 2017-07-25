"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Dependencies
var express = require("express");
// import express = require("express");
var app = express();
//Controller mappings
/**
 * Landing page
 */
app.get('/', function (req, res) {
    // res.send('Hello World!')
    res.sendFile("C:\\\\Dev\\MyTest\\views\\index.html");
});
/**
 * Routes Javascript requests
 */
app.get('/js/:fileName', function (req, res) {
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});
/**
 * Routes CSS requests
 */
app.get('/css/:fileName', function (req, res) {
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});
/**
 * Routes view requests
 */
app.get('/partials/:fileName', function (req, res) {
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\views\\partials\\" + fileName);
});
app.listen(3000, function () {
    console.log('MyTest app listening on port 3000!');
});
