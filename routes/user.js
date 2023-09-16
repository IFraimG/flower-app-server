const express = require('express');
const router = express.Router();
const usersController = require("../controllers/user.controller")
let passport = require("../configs/passportConfig.js")
let upload = require("../configs/upload.js")

router.put("/edit_profile", upload.array("img"), passport.authenticate('jwt', { session: false }), usersController.editProfile)
router.post("/add_photo", upload.single("img"), passport.authenticate('jwt', { session: false }), usersController.addPhoto)
router.put("/change_scores", passport.authenticate('jwt', { session: false }), usersController.changeScores)
router.get("/get_user", passport.authenticate('jwt', { session: false }), usersController.getUserByID)
router.put("/add_habit", passport.authenticate('jwt', { session: false }), usersController.addHabit)
router.delete("/remove_habit", passport.authenticate('jwt', { session: false }), usersController.removeHabit)
router.get("/get_habit_by_title", passport.authenticate('jwt', { session: false }), usersController.getHabitByTitle)

module.exports = router;
