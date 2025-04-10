exports.middlewareOne = (req, res, next) => {
  console.log('Middleware One');
  next();
};

exports.middlewareTwo = (req, res, next) => {
  console.log('Middleware Two');
  next();
};

exports.middlewareThree = (req, res, next) => {
  console.log('Middleware Three');
  next();
};

// module.exports = {
//   middlewareOne,
//   middlewareTwo,
//   middlewareThree,
// };
