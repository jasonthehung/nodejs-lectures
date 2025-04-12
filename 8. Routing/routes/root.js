const express = require('express');
const router = express.Router();
const path = require('path');

// '/' and '/index.html' and '/index' are all acceptable
router.get(/^\/$|\/index(.html)?/, (req, res) => {
  // Approach 1
  // res.sendFile("./views/index.html", { root: __dirname });

  // Approach 2
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get(/\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get(/\/old-page(.html)?/, (req, res) => {
  res.redirect(301, '/new-page.html'); // 302 by default not change the page
});

module.exports = router;
