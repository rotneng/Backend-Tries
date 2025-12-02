const mongoose = require("mongoose")
const verificationToken = mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    token: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        index:{expires:300}
    }
})

const Token = mongoose.model("Token", verificationToken)
module.exports = Token