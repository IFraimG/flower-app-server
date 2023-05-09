const express = require('express');
const Advertisement = require('../models/Advertisement');
const router = express.Router();
const Setter = require("../models/Setter")

router.put("/done", async (req, res) => {
  try {
    await Advertisement.findOneAndUpdate({ advertsID: req.body.advertID }, { isSuccessDone: true, userDoneID: req.body.userID }, {
      new: true
    })
    res.status(200).send({message: "Update"})
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: "Error" })
  }
})

router.put("/set_market", async (req, res) => {
  try {
    let result = await Setter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({ message: "Error" })
  }
})


module.exports = router;
