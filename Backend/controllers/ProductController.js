// const express = require('express');
// var ObjectId = require('mongodb').ObjectID;
var ProductModel  = require('../models/Products');

storeProductDetails = async (req, res, next) => {
            let product = new ProductModel({   
	            pname:req.body.pname,
                price:req.body.price,
                quantity:req.body.quantity,
                unit:req.body.unit,
                url:req.body.url
            });
            product.save((err,result)=> {
                if(err) throw err;
                console.log(result);
                res.send(result);
            });
}
getProductById = async (req,res,next)=> {
    let pid = req.params.pid;
    console.log("Id is "+pid)
    ProductModel.findOne({_id:pid},(err,docs)=> {
        if(!err){
            res.json(docs);
        }else {
            console.log(err)
        }
    })
}  
getProductDetails = async (req,res,next)=> {
                ProductModel.find({},(err,docs)=> {
                    if(!err){
                        res.json(docs);
                    }
                })
}

deleteProductById = async (req,res,next)=> {
    let pid = req.params.pid;
    ProductModel.findByIdAndDelete({_id:pid},(err,doc)=> {
        if(!err){
            res.send("Deleted successfully..");
        }
    })
}

updateProductDetails = async (req,res,next)=> {
    let product = req.body;
    console.log(product);
    let pid = product._id;
    let productPrice = product.price;
    let productQuantity = product.quantity;
    ProductModel.updateOne({_id:pid},{price:productPrice,quantity:productQuantity},
        (err,doc)=> {
        if(!err){
            res.send("Record updated successfully");
        }
    })
}

getAllCartProducts = async (req,res,next)=> {
   let products = [], id = null;
   let cart = JSON.parse(req.body.cart);
if (!cart) return res.json(products)
    ProductModel.find({},(err,dbProducts)=> {
        if(!err){
            for (var i = 0; i < dbProducts.length; i++) {
                    id = dbProducts[i]._id.toString();
                    if (cart.hasOwnProperty(id)) {
                      dbProducts[i].quantity = cart[id]
                      products.push(dbProducts[i]);
                      console.log("Added....")
                    }
                  }
                  console.log(products);
                  return res.json(products);
        }
    })
}

module.exports= {getAllCartProducts,storeProductDetails,getProductDetails,deleteProductById,getProductById,updateProductDetails}