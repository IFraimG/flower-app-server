const express = require('express');
const router = express.Router();
const Setter = require("../models/Setter")


// router.put("/done", async (req, res) => {
//   try {
//     await Advertisement.findOneAndUpdate({ advertsID: req.body.advertID }, { isSuccessDone: true, userDoneID: req.body.userID }, {
//       new: true
//     })
//     res.status(200).send({message: "Update"})
//   } catch (err) {
//     console.log(err.message);
//     return res.status(400).send({ message: "Error" })
//   }
// })

// отдающий прикрепляется к магазину 
router.put("/set_market", async (req, res) => {
  try {
    let result = await Setter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({ message: "Error" })
  }
})

router.get("/get_token/:authorID", async (req, res) => {
  try {
    let setter = await Setter.findById(req.params.authorID).exec()
    if (setter == null) return res.status(404).send({ message: "NotFound" })
    
    res.status(200).send({ fcmToken: setter.fcmToken })
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  }
})

module.exports = router;
