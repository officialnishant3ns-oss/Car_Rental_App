import Car from "../models/car.models.js"
import fs from 'fs'
import imagekit from "../utils/ImageKit.js"
import Booking from "../models/booking.models.js"


const AddCar = async (req, res) => {
    try {
        const _id = req.user._id
        const { brand, model, year, category, fuel_type, seating_capacity, transmission, pricePerDay, description, location, isAvaliable } = req.body

        if (!brand || !category || !fuel_type || !seating_capacity || !pricePerDay || !location) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }
        const existingCar = await Car.findOne({ model, brand })
        if (existingCar) {
            return res.status(409).json({
                success: false,
                message: "Car already exists"
            })
        }
        //images >>ImageKit setup
        const imageFile = req.file
        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            })
        }
        const FileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: FileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })
        var imageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        })
        const image = imageURL


        const car = await Car.create({
            owner: _id,
            brand,
            model,
            year,
            category,
            fuel_type,
            seating_capacity,
            transmission,
            pricePerDay,
            description,
            location,
            image,
            isAvaliable
        })
        return res.status(201).json({ status: true, message: "Car added succesfully", data: car })

    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({ message: "Something went wrong while adding car" })

    }
}
const getOwnerCar = async (req, res) => {
    try {
        const { _id } = req.user.id
        const car = await Car.find({ owner: _id })
        if (!car) {
            return res.status(400).json({ success: false, message: "No cars found for this owner" })
        }
        return res.status(200).json({
            success: true,
            count: car.length,
            car
        })

    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({ message: "Something went wrong while getting car data " })

    }
}
const toggleAvailability = async (req, res) => {
    try {
        const userId = req.user.id
        const { carId } = req.body

        const car = await Car.findById(carId)

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            })
        }

        if (car.owner?.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }

        car.isAvailable = !car.isAvailable
        await car.save()

        res.json({
            success: true,
            message: "Availability toggled"
        })

    } catch (error) {
        console.error("Toggle Error:", error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
const deleteCar_Null = async (req, res) => {
    try {
        const { carId } = req.body

        const car = await Car.findById(carId)
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            })
        }
        if (car.owner?.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }
        car.owner = null
        car.isAvailable = false
        car.save()
        res.json({
            success: true,
            message: "Car Deleted"
        })

    } catch (error) {
        console.error("delete car Error:", error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

//for update car there
const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        // const {} = req.body

        const updateCar = await Car.findByIdAndUpdate(id,
            req.body, //>>>>>>> we take also there by upper method 
            {
                new: true,
                runValidators: true
            }
        )
        if (!updateCar) {
            return res.status(404).json({ success: true, message: "Car not found" })
        }
        return res.status(200).json({
            success: true,
            message: "Car updated successfully",
            data: updateCar
        })

    } catch (error) {
        console.error("Update car error", error)
        return res.status(500).json({ message: "Something went wrong while Updating car" })
    }
}
//by id deleted permanently
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Invalid car ID" })
        }
        const deletedCar = await Car.findByIdAndDelete(id)
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json({
            success: true,
            message: "Car deleted successfully",
            data: deletedCar
        })

    } catch (error) {
        console.error("Update car error", error)
        return res.status(500).json({ message: "Something went wrong while Updating car" })

    }
}
const getCarByid = async (req, res) => {
    try {
        const { id } = req.params
        const carDetail = await Car.findById(id)
        if (!carDetail) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ status: true, carDetail })

    } catch (error) {
        console.error("Update car error", error)
        return res.status(500).json({ message: "Something went wrong while get carDetail" })

    }
}
//search filter there
const getCarSearch = async (req, res) => {
    try {
        const { carname, brand, category, fuelType, seats, pricePerDay, location } = req.query

        const queryObject = {}

        if (carname) {
            queryObject.carname = { $regex: carname, $options: "i" }
        }
        if (brand) {
            queryObject.brand = { $regex: brand, $options: "i" }
        }
        if (category) {
            queryObject.category = category
        }
        if (fuelType) {
            queryObject.fuelType = category
        }
        if (seats) {
            queryObject.seats = { $regex: seats, $options: "i" }
        }
        if (pricePerDay) {
            queryObject.pricePerDay = { $regex: pricePerDay, $options: "i" }
        }
        if (location) {
            queryObject.location = { $regex: location, $options: "i" }
        }
        const cars = await Car.find(queryObject)
        if (!cars) {
            return res.status(400).json({
                success: false,
                message: "Car not found"
            })
        }
        return res.status(201).json({ status: true, message: "Car Load succesfully", data: cars })

    } catch (error) {
        console.error("Message Error In Get car filter")
        return res.status(500).json({ message: "Something went wrong while get carDetail {search filter there}" })

    }
}

const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user
        if (role !== 'owner') {
            return res.status(401).json({ message: "Unathorised access" })
        }
        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })

        const pendingData = await Booking.find({ owner: _id, status: 'PENDING' })
        const confirmData = await Booking.find({ owner: _id, status: 'CONFIRMED' })

        const monthlyRevenue = bookings
            .filter(booking => booking.status === "CONFIRMED")
            .reduce((acc, booking) => acc + booking.totalprice, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingData.length,
            completeBookings: confirmData.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }
        return res.status(200).json({ success: true, dashboardData })
    } catch (error) {
        console.error("Message Error ", error)
        return res.status(500).json({ message: "Something went wrong while get carDetail Dashboard Data" })

    }
}

export { AddCar, updateCar, deleteCar, getCarByid, getCarSearch, getOwnerCar, toggleAvailability, deleteCar_Null,getDashboardData }