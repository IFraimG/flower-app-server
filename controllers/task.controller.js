const Task = require("../models/Task")
const generateRandomString = require("../utils/generateRandomString.js")

// {title, scores, authorID}
module.exports.create = async (req, res) => {
    try {
        let task = await Task.create({ 
            title: req.body.title,
            scores: req.body.scores,
            authorID: req.body.authorID,
            taskID: generateRandomString(10) 
        })
        let result = await task.save()
        res.send(result) 
    } catch (err) {
        res.status(400).send("error")
    }
}

// query {id}
module.exports.delete = async (req, res) => {
    await Task.findOneAndDelete({taskID: req.query.id}).exec()
    res.status(204).send("Удалено")
}

// {id}
module.exports.getTaskByID = async (req, res) => {
    let result = await Task.findOne({taskID: req.query.id}).exec()
    if (result == null) res.status(404).send("Not Found")
    else res.send(result)
}

// {authorID}
module.exports.getTasksList = async (req, res) => {
    let result = await Task.findOne({authorID: req.query.authorID}).exec()
    if (result == null) res.status(404).send("Not Found")
    else res.send(result)
}
