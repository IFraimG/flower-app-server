const express = require('express');
const router = express.Router();
const indexController = require("../controllers/index.controller")
let passport = require("../configs/passportS.js")

router.get('/', async (req, res, next) => res.send("Добро пожаловать!"));

router.get("/get_pin_market", passport.authenticate('jwt', { session: false }), indexController.getPinMarket)

module.exports = router;
