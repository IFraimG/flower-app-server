const express = require('express');
const router = express.Router();
const gettersController = require("../controllers/getters.controller")

// нуждающийся прикрепляется к магазину 
router.put("/set_market", gettersController.setMarket)

router.put("/edit_profile", gettersController.editProfile)

router.get("/get_token/:authorID", gettersController.getToken)

module.exports = router;
