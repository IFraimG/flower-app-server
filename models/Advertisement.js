const mongoose = require("mongoose")

const AdvertisementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fieldDescription: {
        type: String,
        required: false
    },
    listProducts: {
        type: Array,
        required: false
    },
    authorName: {
        type: String,
        required: true
    },
    advertsID: {
        type: String,
        required: true,
        unique: true
    },
    gettingProductID: String,
    authorID: {
        type: String,
        required: true
    },
    dateOfCreated: {
        type: Date,
        default: Date.now()
    },
    dateOfExpires: Date,
    isSuccessDone: {
        type: String,
        default: false
    },
    userDoneID: {
        type: String, 
        required: false
    }
})

module.exports = mongoose.model("Advertisement", AdvertisementSchema)