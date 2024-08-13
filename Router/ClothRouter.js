const express = require("express")
const router  = express.Router()
const controller = require("../Controller/ClothController")


router.post("/postedNewData",controller.postData)


router.get("/getData", controller.getData)


router.get("/getSingleData/:id", controller.singleData)


router.put("/putData/:id", controller.updateData)


router.delete("/deleteData", controller.deleteData)


module.exports = router;