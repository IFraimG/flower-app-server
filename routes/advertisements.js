const express = require('express');
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const Getter = require('../models/Getter');

router.get('/get_own_item/:authorID', async (req, res) => {
  const result = await Advertisement.findOne({ isSuccessDone: false, authorID: req.params.authorID })
  res.send(result)
});

router.get('/get_active', async (req, res) => {
  const result = await Advertisement.find({ isSuccessDone: false })
  res.send(result)
});

router.get("/get_item_by_id/:advertID", async (req, res) => {
  const result = await Advertisement.findOne({ advertsID: res.params.advertID })
  if (result == null) res.status(404).send({message: "NotFound"})
  else res.send(result)
})

router.post("/create", async (req, res) => {
  try {
    const info = req.body

    await Advertisement.findOneAndDelete({ authorID: info.authorID, isDone: false })

    const advertisement = new Advertisement({ 
      title: info.title, 
      fieldDescription: info.desc, 
      listProducts: info.products, 
      authorName: info.authorName,
      advertsID: info.advertsID,
      authorID: info.authorID,
      listProducts: info.listProducts,
      gettingProductID: info.gettingProductID,
      dateOfExpires: info.dateOfExpires
    })
  
    let err = await advertisement.save()
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Error"})
    } else {
  
      res.status(200).send(advertisement)
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({message: "Error"})
  }
})

router.delete("/done/:advertID", async (req, res) => {
  const result = await Advertisement.deleteOne({ advertID: req.params.advertID })
  res.send(result.deletedCount >= 1)
})

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

module.exports = router;
