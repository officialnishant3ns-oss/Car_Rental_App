import { Router } from "express"
import { AddCar, getCarByid, updateCar,deleteCar,getCarSearch } from "../controllers/car.controller.js"
import  verifyJWT  from '../middleware/auth.middleware.js'
const router = Router()

router.post('/addcar',verifyJWT,AddCar)
router.post('/updatecar/:id',verifyJWT,updateCar)
router.delete('/deletecar/:id',verifyJWT,deleteCar)
router.get('/getcar/:id',getCarByid)
router.get('/getallcar',getCarSearch)


export default router