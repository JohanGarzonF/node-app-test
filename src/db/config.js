import mongoose from 'mongoose'

const DB_CNN = process.env.DB_CONNECTION

export const dbConnection = async () => {

    try {
        await mongoose.connect(DB_CNN)
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Error starting database')
    }

}