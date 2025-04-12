const path = require('path');
const express = require('express');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const app = express();
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Build-in middleware to handle urlencoded form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Build-in middleware for json
// 'content-type: application/json'
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
