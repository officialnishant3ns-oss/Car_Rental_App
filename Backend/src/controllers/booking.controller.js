import Booking from "../models/booking.models.js";
import Car from "../models/car.models.js";

export const hasBookingConflict = async (carId, start, end) => {

    const conflict = await Booking.exists({
        car: carId,
        status: { $ne: "CANCELED" },
        pickupDate: { $lt: end },
        returnDate: { $gt: start }
    })

    return !!conflict
}
const CarAvialableONsearch = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body
        if (!location || !pickupDate || !returnDate) {
            res.status(401).json({
                success: false,
                message: "All fields required there"
            })
        }
        const cars = await Car.find({ location, isAvailable: true })
        if (cars.length === 0) {
            res.status(401).json({
                success: false,
                message: "No Car Found"
            })
        }
        const checkedCars = await Promise.all(
            cars.map(async (car) => {
                const conflict = await hasBookingConflict(car._id, new Date(pickupDate), new Date(returnDate))
                return conflict ? null : car;
            })
        )
        const availableCars = checkedCars.filter(car => car && car.isAvailable === true)
        return res.status(200).json({ success: true, availableCars })

    } catch (err) {
        console.error("Car Avialability on search Error:", err)
        res.status(500).json({
            success: false,
            message: "Car Avialability on search"
        })
    }
}
const createBooking = async (req, res) => {
    try {
        const userId = req.user._id
        const { carId, pickupDate, returnDate } = req.body

        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        const start = new Date(pickupDate)
        const end = new Date(returnDate)

        if (start >= end) {
            return res.status(400).json({
                success: false,
                message: "Invalid date range"
            })
        }

        if (start < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Cannot book past dates"
            })
        }

        const car = await Car.findById(carId)
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            })
        }

        if (!car.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Car unavailable"
            })
        }

        const conflict = await hasBookingConflict(carId, start, end)
        if (conflict) {
            return res.status(409).json({
                success: false,
                message: "Car already booked for selected dates"
            })
        }

        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        const totalPrice = days * car.pricePerDay

        const booking = await Booking.create({
            user: userId,
            car: carId,
            owner: car.owner,
            pickupDate: start,
            returnDate: end,
            totalprice: totalPrice
        })

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        })
    } catch (err) {
        console.error("Create Booking Error:", err)
        return res.status(500).json({
            success: false,
            message: "Server error while creating booking"
        })
    }
}
const getUserBooking = async (req, res) => {
    try {
        // const userId = req.user._id
        const bookings = (await Booking.find({ user: req.user._id }).populate("car").sort({ createdAt: -1 }))
        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            })
        }
        return res.status(200).json({ success: true, message: 'User Booking Found Successfully', bookings })
    } catch (error) {
        console.error("Error while Fetching User Booking", error)
        return res.status(500).json({ success: false, message: "Error while Fetching User Booking" })

    }
}
const getOwnerBooking = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.status(401).json({ success: false, message: "Error Unauthorised" })
        }

        const bookings = await Booking
            .find({ owner: req.user._id })
            .populate("car")
            .populate("user", "name email phone")
            .sort({ createdAt: -1 })

        if (!bookings.length) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            })
        }
        return res.status(200).json({ success: true, message: 'Owner Booking Found Successfully', bookings })

    } catch (error) {
        console.error("Error while Fetching User Booking", error)
        return res.status(500).json({ success: false, message: "Error while Fetching User Booking" })

    }
}
const statusChange = async (req, res) => {
    try {
        const userId = req.user.id
        const { bookingId, status } = req.body
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorised"
            })
        }

        booking.status = status
        await booking.save()
        return res.status(200).json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.error("Error while Fetching changing status", error)
        return res.status(500).json({
            success: false,
            message: "Server error CHanging Status"
        })
    }
}

 const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params

    const booking = await Booking.findById(id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      })
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}
export { createBooking, CarAvialableONsearch, getUserBooking, getOwnerBooking, statusChange,deleteBooking }