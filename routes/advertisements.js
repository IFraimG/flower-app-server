const express = require('express');
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const Getter = require('../models/Getter');
const generateRandomString = require('../utils/generateRandomString');

// поиск активного объявления для определенного нуждающегося
router.get('/get_own_item/:authorID', async (req, res) => {
  try {
    const result = await Advertisement.findOne({ isSuccessDone: false, authorID: req.params.authorID })
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: "Error" })
  }
});

// поиск все возможных активных объявлений
router.get('/get_active', async (req, res) => {
  const result = await Advertisement.find({ isSuccessDone: false })
  if (result == null) return res.status(404).send({ message: "NotFound" })
  res.status(200).send({result: result})
});

router.get("/get_item_by_id/:advertID", async (req, res) => {
  const result = await Advertisement.findOne({ advertsID: res.params.advertID })
  if (result == null) res.status(404).send({message: "NotFound"})
  else res.send(result)
})

// успешное создание объявления
router.post("/create", async (req, res) => {
  try {
    const info = req.body
    
    await Advertisement.findOneAndUpdate({ authorID: info.authorID, isSuccessDone: false }, { isSuccessDone: true }, { new: true })

    const advertID = generateRandomString(10)
    const advertisement = new Advertisement({ 
      title: info.title,
      listProducts: info.products, 
      authorName: info.authorName,
      advertsID: advertID,
      authorID: info.authorID,
      listProducts: info.listProducts,
      dateOfExpires: info.dateOfExpires
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
})

// нуждающийся просто удаляет свое объявление
router.delete("/done/:advertID", async (req, res) => {
  try {
    const result = await Advertisement.deleteOne({ advertsID: req.params.advertID })
    res.send({isDelete: result.deletedCount >= 1})
  } catch (err) {
    return res.status(400).send({message: err.message})
  }
})

// поиск активных объявлений определенного магазина
router.get("/get_active_by_market", async (req, res) => {
  let users = await Getter.find({ market: req.query.market }).exec()
  let usersID = users.filter(item => item._id)

  const adverts = []
  for (let id of usersID) {
    let result = await Advertisement.find({ authorID: id, isSuccessDone: false }).exec()
    if (result != null) adverts.push(result)
  }

  const randomItem = Math.floor(Math.random() * (adverts.length + 1))

  if (adverts[randomItem] != null) res.status(200).send(adverts[randomItem])
  else res.status(404).send({message: "NotFound"})
})

// нуждающийся получает информацию о том, что отдающий купил для него продукты
router.put("/getting_product", async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { userDoneID: req.body.userDoneID, gettingProductID: req.body.gettingProductID }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
})

// нуждающийся отменяет получение продуктов и указывает объявление завершенным
router.put("/cancel_getting_product", async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { isSuccessDone: true, userDoneID: "" }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(201).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
})

// нуждающийся забирает в магазине продукты
router.put("/finish_getting_product", async (req, res) => {
  try {
    const result = await Advertisement.findOneAndUpdate({ isSuccessDone: false, authorID: req.body.authorID }, 
      { isSuccessDone: true }, { new: true })
    
    if (result == null) return res.status(404).send({ message: "NotFound" })
    res.status(201).send(result)
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message })
  }
})

module.exports = router;
