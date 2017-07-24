//Dependencies
import * as express from "express";
// import express = require("express");
const app = express();

//Controller mappings

/**
 * Landing page
 */
app.get('/', function (req : any, res : any) {
  // res.send('Hello World!')
  res.sendFile("C:\\\\Dev\\MyTest\\views\\index.html");
});

/**
 * Routes Javascript requests
 */
app.get('/js/:fileName', function(req : any, res : any) {
  var fileName : String = req.params.fileName;
  res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});

app.listen(3000, function () {
  console.log('MyTest app listening on port 3000!')
});
