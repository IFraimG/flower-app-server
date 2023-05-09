const express = require('express');
const router = express.Router();
const Getter = require("../models/Getter")
const Setter = require("../models/Setter")


router.get('/', function(req, res, next) {
  res.send("Добро пожаловать!")
});


// поиск магазина, к которому прикреплен любой пользователь
router.get("/get_pin_market", async (req, res) => {
  if (req.query.typeUser == "setter") {
    try {
      let setter = await Setter.findById(req.query.userID)
      if (setter?.market == null) return res.status(404).send({ message: "Error" })
      else return res.status(200).send({market: setter.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  } else {
    try {
      let getter = await Getter.findById(req.query.userID)
      if (getter?.market == null) return res.status(404).send({message: "Error"})
      else return res.status(200).send({market: getter.market})
    } catch (error) {
      console.log(error.message);
      return res.status(404).send({ message: "Error" })
    }
  }
})

module.exports = router;
