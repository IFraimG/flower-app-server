const mongoose = require("mongoose")

const HabitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Habit", HabitSchema)