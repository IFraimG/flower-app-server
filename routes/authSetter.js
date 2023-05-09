let express = require("express")
let router = express.Router()
let User = require("../models/Setter.js")
let { jwtsecret } = require("../configs/jwt.js")
let jwt = require("jsonwebtoken")
let passport = require("../configs/passportS.js")
const bcrypt = require("bcrypt")
const generateRandomString = require("../utils/generateRandomString.js")

router.post("/login", async (req, res) => {
  let user = await User.findOne({login: req.body.login}).exec()
  if (!user) return res.status(404).send({ token: "" })
  else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send({ token: "" })
    else {
      let token = jwt.sign({
        sub: user.authID,
        phone: user.phone,
        login: user.login,
        id: user._id,
        type: "setter"
      }, jwtsecret)
      res.send({token: "Bearer " + token, user: { login: user.login, phone: user.phone, id: user._id }})
    }
  }
})

router.post('/signup', async (req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt);
  let isUserPhone = await User.findOne({ phone: req.body.phone, login: req.body.login }).exec()
  if (!isUserPhone) {
    let user = await User.create({ password, login: req.body.login, phone: req.body.phone, authID: generateRandomString(10) })
    let token = jwt.sign({
      sub: user.authID,
      phone: user.phone,
      login: user.login,
      id: user._id,
      type: "setter"
    }, jwtsecret)
    res.send({token: "Bearer " + token, user: { login: user.login, phone: user.phone, id: user._id }})
  }
  else res.status(400).send({token: ""})
})

router.get("/test", passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.status(200).send({isAuth: true})
})

module.exports = router;