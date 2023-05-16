const Setter = require("../models/Setter")
const bcrypt = require("bcrypt")

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

module.exports.setMarket = async (req, res) => {
  try {
    let result = await Setter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({ message: "Error" })
  }
}

module.exports.getToken = async (req, res) => {
  try {
    let setter = await Setter.findById(req.params.authorID).exec()
    if (setter == null) return res.status(404).send({ message: "NotFound" })
    
    res.status(200).send({ fcmToken: setter.fcmToken })
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  }
}

module.exports.editProfile = async (req, res) => {
  try {
    let setter = await Setter.findById(req.body.userID).exec()

    const match = await bcrypt.compare(req.body.old_password, setter.password);
    if (!match) return res.status(400).send({ message: "Incorrect Password" })

    if (req.body?.login.length > 0) setter.login = req.body.login
    if (req.body?.phone.length > 0) setter.phone = req.body.phone
    if (req.body?.password.length > 0) {
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt);
      setter.password = password
    }
    const result = await setter.save()
    res.status(201).send(result)
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  
  }
}
