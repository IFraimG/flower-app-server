const mongoose = require("mongoose")
const Advertisement = require("./Advertisement")

const GetterSchema = new mongoose.Schema({
    X5_id: String,
    advertisement: Advertisement
})

module.exports = mongoose.model("Getter", GetterSchema)