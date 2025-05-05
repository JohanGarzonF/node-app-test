import { Router } from 'express'
import { check } from 'express-validator'
import { login, register, getProfile } from '../controllers/auth.controller.js'
import { field_validation } from '../middlewares/field.validation.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password is required and must be at least 6 characters long'
    ).isLength({ min: 6 })
  ],
  field_validation,
  register
)

router.post(
  '/login',
  [check('email', 'Email is required').isEmail()],
  field_validation,
  login
)
router.get('/profile', verifyToken, getProfile)

export default router
