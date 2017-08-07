//Dependencies
import * as express from "express";
// import express = require("express");
const app = express();

//Controller mappings

/**
 * Landing page
 */
app.get('/', function (req : any, res : any) {
  console.log("GET: /");

  // res.send('Hello World!')
  res.sendFile("C:\\\\Dev\\MyTest\\views\\index.html");
});

/**
 * Routes Javascript requests
 */
app.get('/js/:fileName', function(req : any, res : any) {
   console.log("GET: /js/" + req.params.fileName);

  var fileName : String = req.params.fileName;
  res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});

/**
 * Routes TS requests
 */
app.get('/compiled/:fileName', function(req : any, res : any) {
   console.log("GET: /js/" + req.params.fileName);

  var fileName : String = req.params.fileName;
  res.sendFile("C:\\\\Dev\\MyTest\\dist\\compiled\\" + fileName);
});

/**
 * Routes CSS requests
 */
app.get('/css/:fileName', function(req : any, res : any) {
  console.log("GET: /css/" + req.params.fileName);

  var fileName : String = req.params.fileName;
  res.sendFile("C:\\\\Dev\\MyTest\\dist\\" + fileName);
});

/**
 * Routes view requests
 */
app.get('/partials/:fileName', function(req : any, res : any) {
  console.log("GET: /partials/" + req.params.fileName);

  var fileName : String = req.params.fileName;
  res.sendFile("C:\\\\Dev\\MyTest\\views\\partials\\" + fileName);
});

app.post('/login*', function(req : any, res : any) {
  console.log("POST: /login");
});

app.post('/registration*', function(req : any, res : any) {
  console.log("POST: /registration");
});

app.listen(3000, function () {
  console.log('MyTest app listening on port 3000!')
});


// REST API services - figure out how to put these into a different file later

// Temp server Product data store. Move to mongo later
var productData : Product[] = [
    { name : "Nintendo", id : 1},
    { name : "Sega", id : 2},
    { name : "Jaguar", id : 3},
];

/**
 * Get all products
 */
app.get('/products/', function(req : any, res : any) {
  console.log("GET: /products/");

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(productData));
});

let productExists = function(productID : number) : boolean {
  let ret : boolean = false;

  productData.map(function(prod) {
    if (prod.id === productID) {
      ret = true;
    }
  });

  return ret;
};

let insertProduct = function(id:number, name:string) : void {
  let prod : Product = new Product();
  prod.id = id;
  prod.name = name;
  productData.push(prod);
};

/**
 * Insert a product
 */
app.post('/products/:id/:name', function(req : any, res : any) {
  console.log("POST: /products/" + req.params.id + "/" + req.params.name);

  if (!(typeof req.params.id === 'number')) {
    console.log("Product ID must be a number");
  } else if (!(typeof req.params.name === 'string')) {
    console.log("Product name must be a string");
  } else if (productExists(req.params.id)) {
    console.log("Product already exists and is being replaced!")
    insertProduct(req.params.id, req.params.name);
  } else {
    console.log("Inserting new product!")
    insertProduct(req.params.id, req.params.name);
  }
});

/**
 * Delete a product
 */
app.delete('/products/:productID', function(req : any, res : any ) {
  let ret : String = "";
  console.log("DEL: /products/" + req.params.productID)
  res.setHeader('Content-Type', 'text/plain');

  let prodID : number = -1;
  try {
    prodID = parseInt(req.params.productID);

    let beforeCount : number = productData.length;
    productData = productData.filter(function(p) {
      // Remove any products that have the given product ID
      return p.id !== prodID;
    });

    if (beforeCount > productData.length) {
      ret = "Deleted product: " + prodID;
    } else {
      ret = "Product ID " + prodID + " does not exist";
    }
  } catch (ex) {
    ret = "Product ID must be a number!";
  }
  console.log(ret);
  res.send(ret);
});
