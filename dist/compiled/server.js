"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Dependencies
var express = require("express");
var mongodb = require("mongodb"); // install typings with npm install @types/mongodb
// import express = require("express");
var Product_1 = require("./Product");
var app = express();
var myDB;
//Mongo
mongodb.MongoClient.connect('mongodb://localhost:27017/MyTest', function (err, db) {
    if (err) {
        console.log("Could not connect to MongoDB");
        throw err;
    }
    console.log("Connected to MongoDB");
    myDB = db;
    db.collection('product').find().toArray(function (err, result) {
        if (err)
            throw err;
        var castedResults = result;
        console.log("Contents of MyTest/product: ");
        for (var _i = 0, castedResults_1 = castedResults; _i < castedResults_1.length; _i++) {
            var x = castedResults_1[_i];
            console.log(JSON.stringify(x));
        }
    });
});
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
// Temp server Product data store. Move to mongo later
// var productData : Product[] = [
//     { name : "Nintendo", id : 1},
//     { name : "Sega", id : 2},
//     { name : "Jaguar", id : 3},
// ];
/**
 * Get all products
 */
app.get('/products/', function (req, res) {
    console.log("GET: /products/");
    res.setHeader('Content-Type', 'application/json');
    var sortObj = { id: 1 };
    myDB.collection('product').find().sort(sortObj).toArray(function (err, result) {
        if (err)
            throw err;
        var castedResults = result;
        // console.log("Contents of MyTest/product: ");
        // for (let x of castedResults) {
        //   console.log(JSON.stringify(x));
        // }
        res.send(JSON.stringify(castedResults));
    });
});
var productExists = function (productID) {
    var ret = false;
    var queryProd = new Product_1.Product();
    queryProd.id = productID;
    myDB.collection('product').find(queryProd).toArray(function (err, result) {
        if (err)
            throw err;
        var castedResults = result;
        if (castedResults.length > 0)
            ret = true;
        // castedResults.map(function(prod) {
        //   if (prod.id === productID) {
        //     ret = true;
        //   }
        // });
    });
    return ret;
};
var insertProduct = function (id, name) {
    var prod = new Product_1.Product();
    prod.id = id;
    prod.name = name;
    myDB.collection('product').insertOne(prod, function (err, result) {
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
app.post('/products/:id/:name', function (req, res) {
    console.log("POST: /products/" + req.params.id + "/" + req.params.name);
    res.setHeader('Content-Type', 'text/plain');
    var ret = "";
    try {
        var prodID = parseInt(req.params.id);
        var prodName = req.params.name;
        insertProduct(prodID, prodName);
        ret = "Inserted " + prodID + " : " + prodName;
    }
    catch (ex) {
        ret = "Invalid inputs for insertion.";
        console.log(ex);
    }
    res.send(ret);
});
/**
 * Delete a product
 */
app.delete('/products/:productID', function (req, res) {
    var ret = "";
    console.log("DEL: /products/" + req.params.productID);
    res.setHeader('Content-Type', 'text/plain');
    var prodID = -1;
    try {
        prodID = parseInt(req.params.productID);
        ret = "Attempting to delete ID: " + prodID;
        var queryProd = new Product_1.Product();
        queryProd.id = prodID;
        myDB.collection('product').deleteOne(queryProd, function (err, result) {
            // This block of code doesn't work because this callback is async
            // if (err) {
            //   ret = "Could not delete product: " + prodID;
            // } else if (result.deletedCount != null && result.deletedCount > 0) {
            //   ret = "Deleted product: " + prodID;
            // } else if (result.deletedCount == null || result.deletedCount < 1) {
            //   ret = "Could not find for deletion: " + prodID;
            // }
            if (err)
                throw err;
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
    }
    catch (ex) {
        console.log(ex);
    }
    console.log(ret);
    res.send(ret);
});
