const mongoose = require("mongoose")
require("dotenv").config()
// const MONGO_URL = process.env.DB_URL_LOCAL
const MONGO_URL =  process.env.DB_URL

mongoose.connect(MONGO_URL)

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