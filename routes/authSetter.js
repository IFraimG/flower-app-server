let express = require("express")
let router = express.Router()
let passport = require("../configs/passportS.js")
const authSettersController = require("../controllers/authSetters.controller.js")

router.post("/login", authSettersController.login)

router.post('/signup', authSettersController.signup)

router.get("/test", passport.authenticate('jwt', { session: false }), authSettersController.test)

module.exports = router;