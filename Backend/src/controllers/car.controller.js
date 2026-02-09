import Car from "../models/car.models.js"

const AddCar = async (req, res) => {
    try {
        const { carname, brand, category, fuelType, seats, pricePerDay, status, location } = req.body

        if (!carname || !brand || !category || !fuelType || !seats || !pricePerDay || !location) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }
        const existingCar = await Car.findOne({ carname, brand })
        if (existingCar) {
            return res.status(409).json({
                success: false,
                message: "Car already exists"
            })
        }
        //images >>cloudinary setup

        const car = await Car.create({
            carname,
            brand,
            category,
            fuelType,
            seats,
            pricePerDay,
            status,
            location

        })
        return res.status(201).json({ status: true, message: "Car added succesfully", data: car })

    } catch (error) {
        console.error("Register Error::", error)
        return res.status(500).json({ message: "Something went wrong while adding car" })

    }
}
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
export { AddCar, updateCar, deleteCar, getCarByid, getCarSearch }