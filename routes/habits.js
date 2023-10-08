const express = require('express');
const router = express.Router();
const habitController = require("../controllers/habit.controller.js")
let upload = require("../configs/upload.js")
let passport = require("../configs/passportConfig.js")

// router.post("/create", upload.array("img"), passport.authenticate('jwt', { session: false }), guideController.create)
// router.delete("/delete", passport.authenticate('jwt', { session: false }), guideController.delete)
// router.get("/getGuideByID", passport.authenticate('jwt', { session: false }), guideController.getGuideByID)
// router.put("/change_guide", upload.array("img"), passport.authenticate('jwt', { session: false }), guideController.update)

module.exports = router;