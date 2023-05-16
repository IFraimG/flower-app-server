let express = require("express")
let router = express.Router()
let passport = require("../configs/passportS.js")
const authGettersController = require("../controllers/authGetters.controller.js")

router.post("/login", authGettersController.login)

router.post('/signup', authGettersController.signup)

router.get("/test", passport.authenticate('jwt', { session: false }), authGettersController.test)

module.exports = router;