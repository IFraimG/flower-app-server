const express = require('express');
const router = express.Router();
const Getter = require("../models/Getter")

router.get('/', function(req, res, next) {
  res.send("iii")
});

router.put("/set_market", async (req, res) => {
  try {
    let result = await Getter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.send(result).status(200)
  } catch (error) {
    return res.sendStatus(400) 
  }
})

module.exports = router;
