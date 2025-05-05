import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'
const jwt_secret = process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader) return next(errorHandler(401, 'Unauthorized'))
  const token = authHeader.split(' ')[1]
  if (!token) return next(errorHandler(401, 'Unauthorized'))

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'))
    req.user = user
    next()
  })
}
