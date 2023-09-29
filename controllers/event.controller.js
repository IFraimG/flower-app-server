const Event = require("../models/Event")
const generateRandomString = require("../utils/generateRandomString.js")

// {id, title, img, description, time, place, authorID, scores, maxUsers, currentUsers }
module.exports.create = async (req, res) => {
  try {
    console.log(req);
    let event = await Event.create({ 
        title: req.body.title,
        photo: req.files[0].filename,
        description: req.body.description,
        time: req.body.time,
        place: req.body.place,
        authorID: req.body.authorID,
        scores: Number.parseInt(req.body.scores),
        maxUsers: Number.parseInt(req.body.maxUsers),
        currentUsers: Number.parseInt(req.body.currentUsers),
        eventID: generateRandomString(10),
        longt: parseFloat(req.body.longt),
        lat: parseFloat(req.body.lat)
    })
    let result = await event.save()
    res.send(result)
  } catch (err) {
    console.log(err.message);
    res.status(400).send("error")
  }
}

// {id}
module.exports.delete = async (req, res) => {
  await Event.findOneAndDelete({eventID: req.query.id}).exec()
  res.status(204).send("Удалено")
}

// {id}
module.exports.getEventByID = async (req, res) => {
  let result = await Event.findOne({eventID: req.query.id}).exec()
  if (result == null) res.status(404).send("Not Found")
  else res.send(result)
}

// {eventID}
module.exports.addUserToEvent = async (req, res) => {
  let result = await Event.findOne({eventID: req.body.eventID}).exec()
  if (result == null) res.status(404).send("Not Found")
  else {
    result.usersList.push(req.body.authorID)
    await result.save()
    res.send(result)
  }
}

module.exports.getEventsList = async (req, res) => {
  let result = await Event.find({}).exec()
  res.send({item: result})
}

module.exports.findTheNearestEvents = async (req, res) => {

}