const express = require('express');
const router = express.Router();
const notificationsController = require("../controllers/notifications.controller")

router.get("/get_notifications", notificationsController.getNotifications)

router.get("/get_notification_one/:notificationID", notificationsController.getNotificationOne)

router.post("/create_notification", notificationsController.createNotification)

router.put("/set_read", notificationsController.setRead)

module.exports = router