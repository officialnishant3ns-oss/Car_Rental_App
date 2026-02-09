import app from '../src/app.js'
import dotenv from 'dotenv'
import connectDB from './db/db.js'

dotenv.config(
    {
        path: './.env'
    }
)

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 9000, () => {
            console.log(`Server is ready at ${process.env.PORT}`);
        })
        app.on("error", (error) => {
            console.error("ERROR:", error)
            throw error
        })
    })
    .catch((error) => {
        console.log("Mongo_DB connection failed", error);
    })

app.get('/api/v1', (_, res) => {
    res.send(`<h1>Welcome to the <span style='color:red '>Car-Rental</span> App</h1>`)
})