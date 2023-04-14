const mongoose = require("mongoose")

const SetterSchema = new mongoose.Schema({
    X5_ID: mongoose.Schema.Types.ObjectId,
    successHistory: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("Setter", SetterSchema)