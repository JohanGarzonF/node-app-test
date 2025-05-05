import { Schema, model } from 'mongoose'

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = model('User', userSchema)

export default User
