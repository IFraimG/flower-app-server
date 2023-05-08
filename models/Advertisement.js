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
    listProducts: [{
        title: {
            type: String
        }
    }],
    authorName: {
        type: String,
        required: true
    },
    advertsID: mongoose.Schema.Types.ObjectId,
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