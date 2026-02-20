import { Router } from "express"
import { createBooking } from "../controllers/booking.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"

const router = Router()

router.post('/createbooking',verifyJWT,createBooking)




export default router

