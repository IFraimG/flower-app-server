const express = require('express');
const router = express.Router();
const indexController = require("../controllers/index.controller")

router.get('/', async (req, res, next) => res.send("Добро пожаловать!"));

router.get("/get_pin_market", indexController.getPinMarket)

module.exports = router;
