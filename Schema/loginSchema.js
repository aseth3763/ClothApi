const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const LoginSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },password :({
        type : String,
        required : true,
        unique : true
    })
}, {timestamps : true})

LoginSchema.pre("save", async function(next){
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password,salt)
            this.password = hashedPassword
            next()
        } catch (error) {
            next(error)
        }
})

const LoginModel = mongoose.model("LoginModel",LoginSchema)

module.exports = LoginModel ; 