const express = require('express');
const router = express.Router();
const Getter = require("../models/Getter")

// нуждающийся прикрепляется к магазину 
router.put("/set_market", async (req, res) => {
  try {
    let result = await Getter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({message: "Error"})
  }
})

module.exports = router;
