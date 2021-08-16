let express = require("express");
let router = express.Router();  //router reference. 
let OrderController = require("../controllers/OrderController");


router.post("/placeOrder",OrderController.placeOrder);
router.get("/orderDetails/:email",OrderController.orderDetails);
router.get("/allOrderDetails",OrderController.allOrderDetails);
module.exports=router;
