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

module.exports = authController