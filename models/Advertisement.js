const mongoose = require("mongoose")

const AdvertisementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
        default: Date.now().toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', year: '2-digit'})
    },
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