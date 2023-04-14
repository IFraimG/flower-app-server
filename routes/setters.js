const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send("iii")
});

module.exports = router;
