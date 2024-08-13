const express = require("express");
const router = express.Router();
const controller =require("../Controller/loginController")

router.post("/postData", controller.postDATA)

router.get("/login", controller.login)

router.get("/checkData", controller.checkData)


module.exports = router;
