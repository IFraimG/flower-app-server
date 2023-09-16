const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => res.send("Добро пожаловать!"));

router.get("/image/:imageName", async (req, res) => {
    const options = { root: "./" }
    res.sendFile("uploads/" + req.params.imageName, options)
})

module.exports = router;
