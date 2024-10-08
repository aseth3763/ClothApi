const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser =  require("body-parser");
app.use(bodyParser.json())
const port = process.env.port ||  5000

app.get("/",async(req , res)=>{
    res.send("Get method working on homepage")
})

const ClothRouter = require("./Router/ClothRouter")
app.use("/cloth",ClothRouter)

const LoginRouter  = require("./Router/loginRouter")
app.use("/signin", LoginRouter)

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
});

