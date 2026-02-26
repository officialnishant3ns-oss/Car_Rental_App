import { Router } from "express"
import { CarAvialableONsearch, createBooking,getUserBooking,getOwnerBooking, statusChange, deleteBooking } from "../controllers/booking.controller.js"
import verifyJWT from "../middleware/auth.middleware.js"

const router = Router()


router.post('/car-avialable-search',verifyJWT,CarAvialableONsearch)
router.post('/createbooking',verifyJWT,createBooking)
router.get('/getuserbooking',verifyJWT,getUserBooking)
router.get('/getownerbooking',verifyJWT,getOwnerBooking)
router.post('/changebookingstatus',verifyJWT,statusChange)
router.delete('/deletebooking/:id',verifyJWT,deleteBooking)



export default router