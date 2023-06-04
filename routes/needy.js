const express = require('express');
const router = express.Router();
const needyController = require("../controllers/needy.controller")
let passport = require("../configs/passportS.js")

// нуждающийся прикрепляется к магазину 
router.put("/set_market", passport.authenticate('jwt', { session: false }), needyController.setMarket)

router.put("/edit_profile", passport.authenticate('jwt', { session: false }), needyController.editProfile)

router.get("/get_token/:authorID", passport.authenticate('jwt', { session: false }), needyController.getToken)

router.put("/change_token", passport.authenticate('jwt', { session: false }), needyController.changeToken)

module.exports = router;
