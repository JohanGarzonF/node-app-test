import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET

export const generateJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email }
    jwt.sign(
      payload,
      jwt_secret,
      {
        expiresIn: '24h'
      },
      (err, token) => {
        if (err) return reject('Error generating token')
        resolve(token)
      }
    )
  })
}
