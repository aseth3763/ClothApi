const mongoose = require("mongoose")

const mongoURL = "mongodb://localhost:27017/SHOP"

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true 
})

const db  = mongoose.connection

db.on("connected",()=>{
    console.log("Connect Successfully");
})

db.on("error",(err)=>{
    console.log({err:"Error occured"});
})

db.on("disconnected",()=>{
    console.log("Disconnected");
})

module.exports = db;