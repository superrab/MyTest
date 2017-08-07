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
    console.log("GET: /");
    // res.send('Hello World!')
    res.sendFile("C:\\\\Dev\\MyTest\\views\\index.html");
});
/**
 * Routes Javascript requests
 */
app.get('/js/:fileName', function (req, res) {
    console.log("GET: /js/" + req.params.fileName);
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});
/**
 * Routes TS requests
 */
app.get('/compiled/:fileName', function (req, res) {
    console.log("GET: /js/" + req.params.fileName);
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\dist\\compiled\\" + fileName);
});
/**
 * Routes CSS requests
 */
app.get('/css/:fileName', function (req, res) {
    console.log("GET: /css/" + req.params.fileName);
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});
/**
 * Routes view requests
 */
app.get('/partials/:fileName', function (req, res) {
    console.log("GET: /partials/" + req.params.fileName);
    var fileName = req.params.fileName;
    res.sendFile("C:\\\\Dev\\MyTest\\views\\partials\\" + fileName);
});
app.post('/login*', function (req, res) {
    console.log("POST: /login");
});
app.post('/registration*', function (req, res) {
    console.log("POST: /registration");
});
app.listen(3000, function () {
    console.log('MyTest app listening on port 3000!');
});
// REST API services - figure out how to put these into a different file later
// Temp mock data
var productData = [
    { name: "Nintendo", id: 1 },
    { name: "Sega", id: 2 },
    { name: "Jaguar", id: 3 },
];
app.get('/products/', function (req, res) {
    console.log("GET: /products/");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(productData));
});
