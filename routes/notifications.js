const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notifications.controller")
let passport = require("../configs/passportS.js")

router.get("/get_notifications", passport.authenticate('jwt', { session: false }), notificationsController.getNotifications)

router.get("/get_notification_one/:notificationID", passport.authenticate('jwt', { session: false }), notificationsController.getNotificationOne)

router.post("/create_notification", passport.authenticate('jwt', { session: false }), notificationsController.createNotification)

router.put("/set_read", passport.authenticate('jwt', { session: false }), notificationsController.setRead)

module.exports = router