const express = require('express');
const router = express.Router();
const Notification = require("../models/Notification")


router.get("/get_notifications/:userID", async (req, res) => {
  try {
    const notifications = await Notification.find({ userID: req.params.userID }).exec()
    if (notifications == null) return res.status(404).send({ message: "NotFound" })
    res.status(200).send({result: notifications})
  } catch (error) {
    return res.status(400).send({message: error.message})
  }
})

router.get("/get_notification_one/:notificationID", async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.notificationID).exec()
        if (notification == null) return res.status(404).send({ message: "NotFound" })
        res.status(200).send(notification)
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
})

router.post("/create_notification", async (req, res) => {
    try {
        const listItems = req.body.listItems == null ? [] : req.body.listItems
        const buttonType = req.body.buttonType == null ? "" : req.body.listItems
        const fromUserID = req.body.fromUserID == null ? "" : req.body.fromUserID
        const notification = await Notification.create({
            title: req.body.title,
            description: req.body.description,
            userID: req.body.userID,
            typeOfUser: req.body.typeOfUser,
            listItems, buttonType, fromUserID
        })

        const result = await notification.save()
        res.status(201).send(result)
    } catch (error) {
      return res.status(400).send({message: error.message})
    }
})

router.put("/set_read", async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.body.notificationID, { isRead: true }, { new: true })
        if (notification == null) return res.status(404).send({ message: "NotFound" })
        res.status(200).send(notification)
    } catch (error) {
      return res.status(400).send({message: error.message})
    }
})

module.exports = router