import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import { generateJWT } from '../utils/jwt.js'

export const register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    // Verify the user doesn´t exist
    let user = await User.findOne({ email })
    if (user) return next(errorHandler(400, 'User Already exist'))
    user = new User(req.body)
    // Password Hash
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    // save user
    await user.save()
    res.status(201).json({
      success: true,
      message: 'User created successfully!'
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    // Verify the user exists
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'User not found!'))
    // Verify the user password
    const validPassword = bcrypt.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'))
    // Generate JWT
    const token = await generateJWT(validUser._id, validUser.email)
    res.status(200).json({
      success: true,
      message: 'login success!',
      token
    })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) return next(errorHandler(404, 'User not found!'))

    const { password: pass, ...userData } = user._doc
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}
