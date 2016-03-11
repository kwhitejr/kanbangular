module.exports = function (req, res, next) {
  if (! req.isAuthenticated()) {
    console.log('you are NOT logged in');
    return res.redirect('/login');
  }
  console.log('you are logged in');
  return next();
};