const express = require('express');
const router = express.Router();
const eventController = require("../controllers/event.controller")
let upload = require("../configs/upload.js")
let passport = require("../configs/passportConfig.js")

router.post("/create", upload.array("img"), passport.authenticate('jwt', { session: false }), eventController.create)
router.delete("/delete", passport.authenticate('jwt', { session: false }), eventController.delete)
router.get("/getEventByID", passport.authenticate('jwt', { session: false }), eventController.getEventByID)
router.put("/addUserToEvent", passport.authenticate('jwt', { session: false }), eventController.addUserToEvent)
router.get("/all", passport.authenticate('jwt', { session: false }), eventController.getEventsList)
router.put("/removeUserToEvent", passport.authenticate("jwt", { session: false }), eventController.refusePeople)

module.exports = router;