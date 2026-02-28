import express, { Router } from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()


app.use(cors({
  origin: "https://car-rental-app-1-304v.onrender.com/", 
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))
app.use(cookieParser()) 

import UserRouter from './routes/auth.routes.js'
app.use('/api/v1/user', UserRouter)


import carRoutes from '../src/routes/car.routes.js'
app.use('/api/v1/car',carRoutes)

import bookingRoutes from '../src/routes/booking.routes.js'
app.use('/api/v1/booking',bookingRoutes)


export default app
