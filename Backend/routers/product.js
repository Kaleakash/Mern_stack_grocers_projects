let express = require("express");
let router = express.Router();  //router reference. 
let ProductController = require("../controllers/ProductController");
//let { isEmail, hasPassword } = require("../validations/validators")


//mapping sub path with http methods. 
router.get("/allProductDetails",ProductController.getProductDetails);
router.get("/retrieveProductById/:pid",ProductController.getProductById)
router.post("/storeProductDetails",ProductController.storeProductDetails);
router.delete("/deleteProductById/:pid",ProductController.deleteProductById);
router.put("/updateProductDetails",ProductController.updateProductDetails);
router.post("/cartProducts",ProductController.getAllCartProducts);


module.exports=router;