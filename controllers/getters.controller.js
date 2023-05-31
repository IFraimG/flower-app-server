const Getter = require("../models/Getter")
const bcrypt = require("bcrypt")

module.exports.setMarket = async (req, res) => {
  try {
    let result = await Getter.findByIdAndUpdate(req.body.userID, { market: req.body.market }).exec()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(400).send({message: error.message})
  }
}

module.exports.editProfile = async (req, res) => {
  try {
    let getter = await Getter.findById(req.body.userID).exec()

    const match = await bcrypt.compare(req.body.old_password, getter.password);
    if (!match) return res.status(400).send({ message: "Incorrect Password" })

    const isGetterWithLogin = await Getter.findOne({ login: req.body.login }).exec()
    const isGetterWithPhone = await Getter.findOne({ phone: req.body.phone }).exec()
    
    if (isGetterWithLogin != null) return res.status(403).send({ message: "Пользователь с таким логином уже существует" })
    if (isGetterWithPhone != null) return res.status(403).send({ message: "Пользователь с таким телефоном уже существует" })

    if (req.body?.login.length > 0) getter.login = req.body.login
    if (req.body?.phone.length > 0) getter.phone = req.body.phone
    if (req.body?.password.length > 0) {
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt);
      getter.password = password
    }
    const result = await getter.save()
    res.status(201).send(result)
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  
  }
}

module.exports.getToken = async (req, res) => {
  try {
    let getter = await Getter.findById(req.params.authorID).exec()
    if (getter == null) return res.status(404).send({ message: "NotFound" })
    
    res.status(200).send({ fcmToken: getter.fcmToken })
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  }
}

module.exports.changeToken = async (req, res) => {
  try {
    let getter = await Getter.findByIdAndUpdate(req.body.userID, { fcmToken: req.body.token }, { new: true }).exec()
    if (getter == null) return res.status(404).send({ message: "NotFound" })
    
    res.status(200).send(getter)
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({message: error.message})
  }
}