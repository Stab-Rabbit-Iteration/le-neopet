const jwt = require('jsonwebtoken');
const jwtSecret = require('../../jwt');
const User = require('../models/user');
const NotAuthorizedError = require('../errors/not-authorized-error');

const currentUser = async (req, res, next) => {
  // GET TOKEN FROM COOKIE
  const token = req.cookies.token;

  // IF NO TOKEN SEND BACK EMPTY OBJECT - MAYBE THROW ERROR?
  if (!token) {
    // throw new NotAuthorizedError();
    return res.send({});
  }

  try {
    // USER ID STORED ON JWT - DECRYPT FROM JWT
    const payload = jwt.verify(token, jwtSecret.JWT_KEY);
    // GET USER FROM DECRYPTED JWT
    const currentUser = await User.findById(payload.userId);
    // ATTACH CURRENT USER TO REQUEST OBJECT
    req.currentUser = currentUser;
    return next();
  } catch (err) {
    return next({
      log: 'Error from currentUser middleware - Not Authorized',
      status: 401,
      message: { err: 'Not Authorized' }
    })
  }
};

module.exports = currentUser;