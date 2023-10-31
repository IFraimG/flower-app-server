const Event = require("../models/Event")
const Guide = require("../models/Guide")
const User = require("../models/User")
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

module.exports.refusePeople = async (req, res) => {
  let result = await Event.findOne({ eventID: req.body.eventID }).exec()
  if (result == null) res.status(404).send("Not Found")
  else {
    let index = result.usersList.findIndex(item => item == req.body.authorID)
    if (index != -1) result.usersList.splice(index, 1)
    await result.save()
    res.send(result)
  }
}

module.exports.getEventsList = async (req, res) => {
  let result = await Event.find({}).exec()
  res.send({item: result})
}

module.exports.findEventsByAuthorID = async (req, res) => {
  let result = await Event.find({ usersList: req.query.authorID }).exec()
  if (result != null) res.send({item: result})
  else res.status(404).send("Not Found")
}

module.exports.findAuthorsEvents = async (req, res) => {
  let result = await Event.find({ authorID: req.query.authorID }).exec()
  if (result != null) res.send({item: result})
  else res.status(404).send("Not Found")
}

module.exports.findNearestEventsByAuthorCoords = async (req, res) => {
  let result = await Event.find({}).exec()
  if (result != null && (req.query.lat != 0 || req.query.longt != 0)) {
    let arr = result.sort(item => {
      return Math.sqrt(Math.pow(item.lat - req.query.lat, 2) + Math.pow(item.longt - req.query.longt, 2))
    })

    res.send({item: arr})
  } else res.send({ item: result })
}

module.exports.getUsersFromEvents = async (req, res) => {
  try {
    let result = await Event.findOne({ eventID: req.query.eventID }).exec()
    let arr = []
    for (let userID of result.usersList) {
      if (userID != req.query.authorID) {
        let user = await User.findOne({ id: userID }).exec()
        if (user != null) arr.push(user)
      }
    }

    res.send({ item: arr })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports.searchPosts = async (req, res) => {
  try {
    const regex = new RegExp(req.query.title, 'i');
    let result = await Event.find({ title: regex }).exec()
    let result2 = await Guide.find({ title: regex }).exec()
    let arr = []
    for (let event of result) {
      arr.push({ title: event.title, image: event.place, type: "event", id: event.eventID })
    }
    for (let guide of result2) {
      arr.push({ title: guide.title, image: guide.photo, type: "guide", id: guide.guideID })
    }

    res.send({ item: arr })
  } catch (err) {
    res.status(400).send(err.message)
  }
}