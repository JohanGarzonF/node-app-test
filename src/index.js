import express from 'express'
import authRouter from './routes/auth.route.js'
import { dbConnection } from './db/config.js'
import cors from 'cors'
const PORT = process.env.PORT || 4000

// create server
const app = express()
// database connection
dbConnection()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())

//Routes
// Auth: // register login logout
app.use('/', ( req, res )=> {
  res.send('It works')
})
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`server open in http://localhost:${PORT}`)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
