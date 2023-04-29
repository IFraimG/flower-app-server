let express = require("express")
let router = express.Router()
let User = require("../models/Setter.js")
let { jwtsecret } = require("../configs/jwt.js")
let jwt = require("jsonwebtoken")
let passport = require("../configs/passportS.js")
const bcrypt = require("bcrypt")

router.post("/login", async (req, res) => {
  let user = await User.findOne({phone: req.body.phone, login: req.body.login}).exec()
  if (!user) return res.status(404).send("Такого пользователя не существует")
  else {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).send("Пароль не верный")
    else {
      let token = jwt.sign({
        sub: user.X5_ID,
        phone: user.phone,
        login: user.login
      }, jwtsecret)
      res.send(["jwt", "Bearer " + token, user])
    }
  }
})

router.post('/signup', async (req, res, next) => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt);
  let isUserPhone = await User.findOne({ phone: req.body.phone, login: req.body.login }).exec()
  if (!isUserPhone) {
    let user = await User.create({ password, login: req.body.login, phone: req.body.phone })
    let token = jwt.sign({
      sub: user.X5_ID,
      phone: user.phone,
      login: user.login
    }, jwtsecret)
    res.send(["jwt", "Bearer " + token, user])
  }
  else res.sendStatus(400).send("Такой пользователь уже существует")
})

router.get("/test", passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send("все хорошо")
})

module.exports = router;