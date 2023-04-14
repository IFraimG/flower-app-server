const mongoose = require("mongoose")

const AdvertisementSchema = new mongoose.Schema({
    title: String,
    fieldDescription: String,
    listProducts: [String],
    authorName: String,
    adversID: mongoose.Schema.Types.ObjectId,
    gettingProductID: String,
    authorID: String,
    dateOfCreated: {
        type: Date,
        default: Date.now()
    },
    dateOfExpires: Date,
    isSuccessDone: Boolean
})

module.exports = mongoose.model("Advertisement", AdvertisementSchema)