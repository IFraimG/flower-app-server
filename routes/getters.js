const express = require('express');
const router = express.Router();
const gettersController = require("../controllers/getters.controller")
let passport = require("../configs/passportS.js")

// нуждающийся прикрепляется к магазину 
router.put("/set_market", passport.authenticate('jwt', { session: false }), gettersController.setMarket)

router.put("/edit_profile", passport.authenticate('jwt', { session: false }), gettersController.editProfile)

router.get("/get_token/:authorID", passport.authenticate('jwt', { session: false }), gettersController.getToken)

router.put("/change_token", passport.authenticate('jwt', { session: false }), gettersController.changeToken)

module.exports = router;
