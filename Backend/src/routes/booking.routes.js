import { Router } from "express"
import { CarAvialableONsearch, createBooking,getUserBooking } from "../controllers/booking.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"

const router = Router()


router.post('/car-avialable-search',verifyJWT,CarAvialableONsearch)
router.post('/createbooking',verifyJWT,createBooking)
router.get('/getuserbooking',verifyJWT,getUserBooking)



export default router