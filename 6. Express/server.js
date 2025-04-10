const path = require('path');
const express = require('express');
const {
  middlewareOne,
  middlewareTwo,
  middlewareThree,
} = require('./middleware');
const app = express();
const PORT = process.env.PORT || 3500;

// '/' and '/index.html' and '/index' are all acceptable
app.get(/^\/$|\/index(.html)?/, (req, res) => {
  // Approach 1
  // res.sendFile("./views/index.html", { root: __dirname });

  // Approach 2
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/\/new-page(.html)?/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get(/\/old-page(.html)?/, (req, res) => {
  res.redirect(301, '/new-page.html'); // 302 by default not change the page
});

// Chain middleware functions
app.get(
  /\/hello(.html)?/,
  (req, res, next) => {
    console.log('attempted to load hello.html');

    next();
  },
  (req, res) => {
    res.send('Hello World!');
  }
);

app.get(
  /\/chain(.html)?/,
  [middlewareOne, middlewareTwo, middlewareThree],
  (req, res) => {
    res.send('Chained Middleware');
  }
);

// Anything that doesn't match the above routes will be handled here
app.get(/\/*/, (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
