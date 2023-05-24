const Advertisement = require("../models/Advertisement");
const Getter = require('../models/Getter');
const generateRandomString = require('../utils/generateRandomString');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

module.exports.getOwnItem = async (req, res) => {
  try {
    const result = await Advertisement.findOne({ isSuccessDone: false, authorID: req.params.authorID }).exec()
    if (result == null) return res.status(404).send({ message: "NotFound" })
    
    const currentDate = dayjs().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss');
    const advertDate = dayjs(result.dateDone) 
    const diffInHours = dayjs(currentDate).diff(advertDate, 'hour');    
    if (diffInHours > 2) {
      await Advertisement.deleteOne({ isSuccessDone: false, authorID: req.params.authorID })
      return res.status(404).send({ message: "NotFound" })
    }
    
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.findOldAdverts = async (req, res, next) => {
  const currentDate = dayjs().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss');
  if ((dayjs(currentDate).hour() >= 23 || dayjs(currentDate).hour() < 10)) {
    await Advertisement.deleteMany({ isSuccessDone: false })
    return next()
  }

  const result = await Getter.find({ market: req.params.market }).exec()
  for (item of result) {
    const advert = await Advertisement.findOne({ authorID: item._id, isSuccessDone: false }).exec()
    if (advert == null) continue

    const advertDate = dayjs(advert.dateDone) 
    const diffInHours = dayjs(currentDate).diff(advertDate, 'hour');    
    if (diffInHours > 2) await Advertisement.deleteOne({ authorID: item._id, isSuccessDone: false })
  }

  next()
}

module.exports.getActiveController = async (req, res) => {
  try {
    const getters = await Getter.find({ market: req.params.market }).exec()
    if (getters == null) return res.status(404).send({ message: "NotFound" })
    const adverts = []

    for (item of getters) {
      const advert = await Advertisement.findOne({ authorID: item._id, isSuccessDone: false, userDoneID: null }).exec()
      if (advert != null) adverts.push(advert)
    }

    if (adverts.length == 0) return res.status(404).send({ message: "NotFound" })
    res.status(200).send({result: adverts})
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.getItemById = async (req, res) => {
  try {
    const result = await Advertisement.findOne({ advertsID: req.params.advertID })
    if (result == null) res.status(404).send({message: "NotFound"})
    else res.send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.create = async (req, res) => {
  try {
    const info = req.body
    
    await Advertisement.findOneAndUpdate({ authorID: info.authorID, isSuccessDone: false }, { isSuccessDone: true }, { new: true })

    const advertID = generateRandomString(10)
    const advertisement = new Advertisement({ 
      title: info.title,
      authorName: info.authorName,
      advertsID: advertID,
      authorID: info.authorID,
      listProducts: info.listProducts
    })
  
    try {
      await advertisement.save()
      res.status(200).send(advertisement)
    } catch (err) {
      console.log(err);
      return res.status(400).send({message: "Error"})
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({message: "Error"})
  }
}

module.exports.done = async (req, res) => {
  try {
    const result = await Advertisement.deleteOne({ advertsID: req.params.advertID })
    res.send({isDelete: result.deletedCount >= 1})
  } catch (err) {
    return res.status(400).send({message: err.message})
  }
}

module.exports.getActiveByMarket = async (req, res) => {
  let users = await Getter.find({ market: req.query.market }).exec()

  const adverts = []
  for (let item of users) {
    let result = await Advertisement.findOne({ authorID: item._id, isSuccessDone: false, userDoneID: null }).exec()
    if (result != null) adverts.push(result)
  }

  const randomItem = Math.floor(Math.random() * (adverts.length + 1))

  if (adverts[randomItem] != null) res.status(200).send(adverts[randomItem])
  else if (adverts.length > 0) res.status(200).send(adverts[0]) 
  else res.status(404).send({message: "NotFound"})
}

module.exports.gettingProduct = async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { userDoneID: req.body.userDoneID, gettingProductID: req.body.gettingProductID, dateDone: dayjs().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss') }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.cancelGettingProduct = async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { isSuccessDone: true, userDoneID: "" }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(201).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.finishGettingProduct = async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { isSuccessDone: true }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(201).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
}

module.exports.findSetterAdvertisements = async (req, res) => {
  try {
    const result = await Advertisement.find({ userDoneID: req.params.userID, isSuccessDone: true }).exec()
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(200).send({advertisements: result})
  } catch (error) {
    return res.status(400).send({ message: err.message })
  }
}
