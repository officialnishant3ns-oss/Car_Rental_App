import { Router } from "express"
import { AddCar, getCarByid, updateCar,deleteCar,getCarSearch,deleteCar_Null, getOwnerCar, toggleAvailability } from "../controllers/car.controller.js"
import  verifyJWT  from '../middleware/auth.middleware.js'
import upload from "../middleware/multer.middleware.js"
const router = Router()

router.post('/addcar',upload.single('image'),verifyJWT,AddCar)

router.post('/updatecar/:id',verifyJWT,updateCar)
router.delete('/deletecar/:id',verifyJWT,deleteCar)
router.get('/getcar/:id',getCarByid)
router.get('/getallcar',getCarSearch)
router.get('/getownercar',verifyJWT,getOwnerCar)
router.post('/toggleavailablity',verifyJWT,toggleAvailability)
router.post('/delete-car',verifyJWT,deleteCar_Null)


export default router