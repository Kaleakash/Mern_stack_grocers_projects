const jwt = require('jwt-simple');
const config = require('../config/app');
const userModel = require('../models/user.model');
let mongoose = require("mongoose");


const User = require('../models/user.model');
const validationHandler = require('../validations/validationHandler')

exports.funds = async (req, res, next) => {
    try{

        const email = req.params.email;
        const user = await User.findOne({email:email});
        console.log(user)
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        let funds = user.funds;
        let bankAccountNumber= user.bankAccountNumber;
        res.send({funds,bankAccountNumber});
    }catch(err){
        next(err);
    }
}
exports.spend = async (req, res, next) => {
    try{
        const id = req.body.id;
        const user = await User.findOne({_id:id});
        console.log(user)
        if (!user){
            const error = new Error("No User Found");
            error.statusCode = 401;
            throw error;
        }
        newFunds = parseInt(user.funds)-parseInt(req.body.amount)
        userModel.findOneAndUpdate({_id:id},{$set:{funds:newFunds}},(err,result)=> {
            if(!err){  
                res.send({"Response":"Record updated succesfully"})
            }else {
                res.send("Error generated "+err);
            }
        })
    }catch(err){
        next(err);
    }
}

exports.addFunds = async (req, res, next) => {
    try{
         const amountToAdd = parseInt(req.body.amount);
        const accountNumber = req.body.accno;
        const user = await User.findOne({bankAccountNumber:accountNumber});
        
        
        const newFunds = user.funds+amountToAdd;
        
        userModel.updateOne({bankAccountNumber:accountNumber},
            {$set:{funds:newFunds}},(err,result)=> {
            if(!err){  
                console.log("done")
                res.send({"Response":"Record updated succesfully"})
            }else {
                console.log(err)
                res.send("Error generated "+err);
            }
        })
    }catch(err){
        console.log(err)
        next(err);
    }
}

exports.findUserDetails = async (req,res,next)=> {
    let email = req.params.email; 
    const user = await User.findOne({email:email});
    if(user!=null){
        console.log(user);
        res.json(user);
    }
}
exports.edit = async (req, res, next) => {
    try{
        let id = req.body._id;
        let newEmail = req.body.email;
        let newFName = req.body.fname;
        let newLName = req.body.lname;
        let newPNumber = req.body.pnumber;
        let newAddress = req.body.address;
        let newValues = {email:newEmail,fname:newFName,lname:newLName,
        pnumber:newPNumber,address:newAddress}
        console.log(newValues)
        userModel.findOneAndUpdate({_id:id},{$set:newValues},(err,result)=> {
            if(!err){
                res.send({"Response":"Record updated succesfully"})
            }else {
                res.send("Error generated "+err);
            }
        })
        
    }catch(err){
        console.log(err)
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email)
        console.log(password)	
        const user = await User.findOne({email}).select("+password");
        if (!user){
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        if (user.isLocked){
            const error = new Error("Too Many Unsuccessful Logins Please Raise Ticket");
            error.statusCode = 401;
            throw error;
        }
        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            console.log(user.consecutiveFailed)
            unsuccessful = parseInt(user.consecutiveFailed) + 1;
            if (unsuccessful >= 3 ){
                locked = true;
            }
            else {
                locked = false;
            }
            
            console.log(unsuccessful)
            console.log(locked)
            userModel.findOneAndUpdate({email:user.email},{$set:{consecutiveFailed:unsuccessful,isLocked:locked}},(err,result)=> {
                if(!err){
                }else {
                }
            })
            const error = new Error("Wrong Credentials");
            error.statusCode = 401;
            throw error;
        }
        userModel.findOneAndUpdate({email:user.email},{$set:{consecutiveFailed:0}},(err,result)=> {
            if(!err){
            }else {
            }
        })
        const token = jwt.encode({id:user.id}, config.jwtSecret);
        return res.send({user, token});
    }catch(err){
        next(err);
    }
}



exports.signup = async (req,res,next) =>{
	 
   try{
    var count = await User.find().count(function(err, count){
       return count;
    });
        let user = new User();
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password);
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.dob = req.body.dob;
        user.pnumber = req.body.pnumber;
        user.address = req.body.address;

        user.funds = 10000; 
        //user.bankBalance = 10000;
        user.bankAccountNumber = 12345+count;
        user.isLocked = false;
        user.consecutiveFailed = 0;
        user = await user.save();
	    console.log(user)
        const token = jwt.encode({id: user.id}, config.jwtSecret);
        return res.send({user, token});
    } catch(err){
console.log(err)
        next(err);
    }
}