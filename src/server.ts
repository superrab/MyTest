//Dependencies
import * as express from "express";
import * as mongodb from "mongodb"; // install typings with npm install @types/mongodb
// import express = require("express");

import { Product } from "./Product";

const app = express();
let myDB : mongodb.Db;

//Mongo
mongodb.MongoClient.connect('mongodb://localhost:27017/MyTest', function (err, db) {
  if (err) {
    console.log("Could not connect to MongoDB");

    throw err;
  }

  console.log("Connected to MongoDB");
  myDB = db;

  db.collection('product').find().toArray(function (err, result) {
    if (err) throw err

    let castedResults : Product[] = result as Product[];

    console.log("Contents of MyTest/product: ");
    for (let x of castedResults) {
      console.log(JSON.stringify(x));
    }
  })
})

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
// var productData : Product[] = [
//     { name : "Nintendo", id : 1},
//     { name : "Sega", id : 2},
//     { name : "Jaguar", id : 3},
// ];

/**
 * Get all products
 */
app.get('/products/', function(req : any, res : any) {
  console.log("GET: /products/");

  res.setHeader('Content-Type', 'application/json');

  let sortObj : any = {id : 1};
  myDB.collection('product').find().sort(sortObj).toArray(function (err, result) {
    if (err) throw err

    let castedResults : Product[] = result as Product[];

    // console.log("Contents of MyTest/product: ");
    // for (let x of castedResults) {
    //   console.log(JSON.stringify(x));
    // }

    res.send(JSON.stringify(castedResults));
  });
  
});

let productExists = function(productID : number) : boolean {
  let ret : boolean = false;

  let queryProd : Product = new Product();
  queryProd.id = productID;

  myDB.collection('product').find(queryProd).toArray(function (err, result) {
    if (err) throw err

    let castedResults : Product[] = result as Product[];
    if (castedResults.length > 0) ret = true;

    // castedResults.map(function(prod) {
    //   if (prod.id === productID) {
    //     ret = true;
    //   }
    // });
  });

  return ret;
};

let insertProduct = function(id:number, name:string) : void {
  let prod : Product = new Product();
  prod.id = id;
  prod.name = name;

  myDB.collection('product').insertOne(prod, function(err : mongodb.MongoError,  result : mongodb.InsertOneWriteOpResult) {
    console.log("Inserted product: " + JSON.stringify(prod));
  });

  // productData.push(prod);

  // productData = productData.sort(function (a: Product, b: Product) : number {
  //   let innerRet : number = 0;

  //   if (a.id == b.id) {
  //     innerRet = 0;
  //   } else if (a.id > b.id) {
  //     innerRet = 1;
  //   } else {
  //     innerRet = -1;
  //   }

  //   return innerRet;
  // }); // end sort
};

/**
 * Insert a product
 */
app.post('/products/:id/:name', function(req : any, res : any) {
  console.log("POST: /products/" + req.params.id + "/" + req.params.name);
  res.setHeader('Content-Type', 'text/plain');
  let ret : string = "";

  try {
    let prodID : number = parseInt(req.params.id);
    let prodName : string = req.params.name;

    insertProduct(prodID, prodName);

    ret = "Inserted " + prodID + " : " + prodName;
  } catch (ex) {
    ret = "Invalid inputs for insertion.";
    console.log(ex);
  }

  res.send(ret);
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
    ret = "Attempting to delete ID: " + prodID;

    let queryProd : Product = new Product();
    queryProd.id = prodID;

    myDB.collection('product').deleteOne(queryProd, function(err : mongodb.MongoError, result: mongodb.DeleteWriteOpResultObject) {
      // This block of code doesn't work because this callback is async
      // if (err) {
      //   ret = "Could not delete product: " + prodID;
      // } else if (result.deletedCount != null && result.deletedCount > 0) {
      //   ret = "Deleted product: " + prodID;
      // } else if (result.deletedCount == null || result.deletedCount < 1) {
      //   ret = "Could not find for deletion: " + prodID;
      // }
      if (err) throw err;
      console.log(ret);
    });

  //   let beforeCount : number = productData.length;
  //   productData = productData.filter(function(p) {
  //     // Remove any products that have the given product ID
  //     return p.id !== prodID;
  //   });

  //   if (beforeCount > productData.length) {
  //     ret = "Deleted product: " + prodID;
  //   } else {
  //     ret = "Product ID " + prodID + " does not exist";
  //   }
  } catch (ex) {
    console.log(ex);
  }
  console.log(ret);
  res.send(ret);
});
