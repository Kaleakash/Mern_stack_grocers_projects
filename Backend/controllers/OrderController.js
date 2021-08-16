var OrderModel  = require('../models/orders');
var UserModel = require("../models/user.model");
placeOrder = async (req, res, next) => {
      let data = req.body;
      const user = await UserModel.findOne({email:data.email});
      console.log(user)
      if (!user){
          const error = new Error("No User Found");
          error.statusCode = 401;
          throw error;
      }
      newFunds = parseInt(user.funds)-parseInt(data.total)
        let result = await UserModel.findOneAndUpdate({email:data.email},
            {$set:{funds:newFunds}},(err,result)=> {})
        console.log("Amont "+result.funds);        
      let order = new OrderModel(
          {orderDetails:data.products,
            emailId:data.email,
            orderDate:new Date(),
            totalAmount:data.total});
            order.save((err,result)=> {
                if(err) throw err;
                console.log(result);
                res.send(result);
            });
}
orderDetails = async (req,res,next)=> {
            let emailId = req.params.email;
            console.log(emailId);
            OrderModel.find({emailId:emailId},(err,doc)=> {
                if(!err){
                    res.json(doc);
                }
            })
}

allOrderDetails = async (req,res,next)=> {
    
    OrderModel.find({},(err,doc)=> {
        if(!err){
            res.json(doc);
        }
    })
}
module.exports= {placeOrder,orderDetails,allOrderDetails}