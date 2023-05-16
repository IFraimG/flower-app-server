const express = require('express');
const router = express.Router();
const settersController = require("../controllers/setters.controller")

router.put("/set_market", settersController.setMarket)

router.get("/get_token/:authorID", settersController.getToken)

router.put("/edit_profile", settersController.editProfile)

module.exports = router;
