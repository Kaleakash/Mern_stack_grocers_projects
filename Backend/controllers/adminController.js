const jwt = require('jwt-simple');
const config = require('../config/app');
const orderModel = require("../models/orders");
exports.login = async (req, res, next) => {
    console.log("admin came here")
    console.log(req.body)
    const { email, password } = req.body;
    if(email==="admin@gmail.com" && password==="admin"){
      res.send("Successfully login done!")
    } else {
      res.send("Failure try once again!");
    }   
};

exports.reportyByProduct = async (req, res, next) => {
      let product = req.params.pname;
      orderModel.find({"orderDetails.pname":product},{orderDetails:{$elemMatch:{pname:product}}},
      (err,doc)=> {
       if(!err){
         console.log(doc);
         res.json(doc);
       }else {
         console.log(err);
       } 
      })
};


exports.reportyByEmail = async (req, res, next) => {
  let emailId = req.params.email;
  console.log("I Came here "+emailId);
  orderModel.find({emailId:emailId},(err,doc)=> {
   if(!err){
     console.log(doc);
     res.json(doc);
   }else {
     console.log(err);
   } 
  })
};
