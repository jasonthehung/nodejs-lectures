const path = require('path');
const express = require('express');
const cors = require('cors');
const {
  middlewareOne,
  middlewareTwo,
  middlewareThree,
} = require('./middleware/middleware');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Build-in middleware to handle urlencoded form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Build-in middleware for json
// 'content-type: application/json'
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

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
// Includes POST, PUT, DELETE, PATCH, etc.
app.all(/\/*/, (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
