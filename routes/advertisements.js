const express = require('express');
const router = express.Router();
const Advertisement = require("../models/Advertisement")

router.get('/get_own_item/:authorID', async (req, res) => {
  const result = await Advertisement.findOne({ isSuccessDone: false, authorID: req.params.authorID })
  res.send(result)
});

router.get('/get_active', async (req, res) => {
  const result = await Advertisement.find({ isSuccessDone: false })
  res.send(result)
});

router.get("/get_item_by_id/:advertID", async (req, res) => {
  const result = await Advertisement.findOne({ adversID: res.params.advertID })
  if (result == null) res.sendStatus(404)
  else res.send(result)
})

router.post("/create", async (req, res) => {
  const info = req.body
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
    return res.sendStatus(400)
  } else {
    // let oldAdvertisement = Advertisement.findOne({ authorID: info.authorID, isDone: false, $nor: })
    // res.send(advertisement).status(200)
  }
})

router.delete("/done/:advertID", async (req, res) => {
  const result = await Advertisement.deleteOne({ advertID: req.params.advertID })
  res.send(result.deletedCount >= 1)
})

module.exports = router;
