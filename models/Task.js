const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    scores: {
        type: Number,
        required: true
    },
    taskID: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Task", TaskSchema)