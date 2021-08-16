const express = require('express');
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/login", userController.login);
router.post("/signUp", userController.signup);
router.get("/funds/:email",userController.funds);
router.put("/addFunds",userController.addFunds);
router.put("/spend",userController.spend);
router.get("/findUser/:email",userController.findUserDetails)
router.put("/editUser",userController.edit);

module.exports = router;