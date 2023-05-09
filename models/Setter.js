const mongoose = require("mongoose")

const SetterSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: false
    },
    authID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Setter", SetterSchema)