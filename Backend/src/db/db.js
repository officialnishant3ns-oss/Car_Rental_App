import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async (req, res) => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected Successfully:: DB_HOST: ${connection.connection.host}`)

    } catch (error) {
        console.error("Mongo_DB connection error:", error)
        process.exit(1)
    }
}

export default connectDB