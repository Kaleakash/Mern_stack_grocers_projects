const express = require("express");
const admin = require("../controllers/adminController");

const router = express.Router();

router.post('/login',admin.login)
router.get("/generateReportByProduct/:pname",admin.reportyByProduct);
router.get("/generateReportByEmail/:email",admin.reportyByEmail);

module.exports = router;
