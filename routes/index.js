const express = require('express');
const router = express.Router();
const Getter = require("../models/Getter")
const Setter = require("../models/Setter")


router.get('/', function(req, res, next) {
  res.send("iii")
});

router.get("/get_pin_market", async (req, res) => {
  if (req.query.typeUser == "setter") {
    try {
      let setter = Setter.findOne({ X5_ID: req.query.typeUser })
      if (setter?.market == null) return res.sendStatus(404)
      else return res.send(setter.market).status(200)
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(400)
    }
  } else {
    try {
      let getter = Getter.findOne({ X5_ID: req.query.typeUser })
      if (getter?.market == null) return res.sendStatus(404)
      else return res.send(getter.market).status(200)
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(400)
    }
  }
})

module.exports = router;
