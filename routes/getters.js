const express = require('express');
const router = express.Router();
const Getter = require("../models/Getter")
const bcrypt = require("bcrypt")


// нуждающийся прикрепляется к магазину 
router.put("/set_market", async (req, res) => {
  try {
    let result = await Getter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({message: error.message})
  }
})

router.put("/edit_profile", async (req, res) => {
  try {
    let getter = await Getter.findById(req.body.userID).exec()
    
    const match = await bcrypt.compare(req.body.oldPassword, getter.password);
    if (!match) return res.status(400).send({ message: "Incorrect Password" })

    if (req.body?.login.length > 0) getter.login = req.body.login
    if (req.body?.phone.length > 0) getter.phone = req.body.phone
    if (req.body?.password.length > 0) {
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt);
      getter.password = password
    }
    const result = await result.save()
    res.status(201).send({ result: result })
  } catch (error) {
    return res.status(400).send({message: error.message})
  
  }
})

module.exports = router;
