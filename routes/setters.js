const express = require('express');
const Advertisement = require('../models/Advertisement');
const router = express.Router();
const Setter = require("../models/Setter")

router.get('/', function(req, res, next) {
  res.send("iii")
});

router.put("/done", async (req, res) => {
  try {
    await Advertisement.findOneAndUpdate({ advertsID: req.body.advertID }, { isSuccessDone: true, userDoneID: req.body.userID }, {
      new: true
    })
    res.sendStatus(200)
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(400)
  }
})

router.put("/set_market", async (req, res) => {
  try {
    let result = await Setter.findOneAndUpdate({ X5_id: req.body.userID }, { market: req.body.market }).exec()
    return res.send(result).status(200)
  } catch (error) {
    return res.sendStatus(400) 
  }
})


module.exports = router;
