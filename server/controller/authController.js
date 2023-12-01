const User = require('../model/userModel')
const attachCookie = require('../util/attachCookie')

const authController = {};

authController.login = async (req, res, next) => {
  console.log('💥 authController.login');
  const { username, password } = req.body

  if (!username || !password) {
    return next({
      log: 'Error from: authController.login',
      status: 400,
      message: {err: 'Invalid inputs - missing details'}
    })
  }

  try {
    const user = await User.findOne({ username })
    
    if (!user) {
      return next({
        log: 'Error from: authController.login - user does not exist',
        status: 400,
        message: {err: 'User not found, signup instead'}
      })
    }

    const passwordVerified = await user.comparePassword(password)
    if (!passwordVerified) {
      return next({
        log: 'Error from authController.login: passwords don\'t match',
        status: 400,
        message: {err: 'Invalid credentials'}
      })
    }

    const userJwt = await user.createJwt()
    attachCookie(res, userJwt)

    return res.status(200).json(user)
  } catch (err) {
    return next({
      log: `Error from: authController.log: ${err}`,
      message: {err: 'Internal error'}
    })
  }
}

authController.signup = async (req, res, next) => {
  console.log('💥 authController.signup');
  const { username, password } = req.body;

  // VALIDATE INPUTS
  if (!username || !password) {
    return next({
      log: 'Error from authController.signup - Invalid inputs',
      status: 400,
      message: {err: 'Invalid inputs'}
    });
  }

  try {
    // CHECK FOR EXISTING USER
    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      return next({
        log: 'Error from authController.signup - User already exists. Login instead',
        status: 400,
        message: {err: 'User already exists. Login instead'}
      });
    }
  
    // CREATE NEW USER
    const newUser = await User.create({
      username,
      password,
    });
  
    // CREATE JWT - method defined on userSchema
    const userJwt = newUser.createJwt();
    // ATTACH JWT TO COOKIE - see /utils/attachCookie
    attachCookie(res, userJwt);
  
    // SEND BACK NEW USER
    return res.status(201).json(newUser);
  } catch (err) {
    return next({
      log: `Error from authController.signup - ${err}`,
      status: 500,
      message: { err }
    })
  }
}

authController.logout = (req, res, next) => {
  console.log('💥 authController.logout');
  // SET THE COOKIE TO NULL
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now() + 500),
  });
  return res.status(200).json({ message: 'User Logged Out' });
};

authController.getCurrentUser = async (req,res, next) => {
  const {currentUser} = req

  if (!currentUser) {
    return res.status(200).json({})
  }

  res.status(200).json(currentUser)
}

module.exports = authController