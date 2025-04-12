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

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employy'));

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
