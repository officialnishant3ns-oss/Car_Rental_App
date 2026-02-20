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

        if (start >= end)
            return res.status(400).json({ success: false, message: "Invalid dates" })

        const car = await Car.findById(carId)

        if (!car)
            return res.status(404).json({ success: false, message: "Car not found" })

        if (!car.isAvailable)
            return res.status(400).json({ success: false, message: "Car unavailable" })

        const conflict = await hasBookingConflict(carId, start, end)

        if (conflict)
            return res.status(409).json({
                success: false,
                message: "Car already booked for selected dates"
            })

        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        const totalPrice = days * car.pricePerDay

        const booking = await Booking.create({
            user: userId,
            car: carId,
            owner: car.owner,
            pickupDate: start,
            returnDate: end,
            totalPrice
        })

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        })
    } catch (err) {
        console.error("Create Booking Error:", err)
        res.status(500).json({
            success: false,
            message: "Server error while creating booking"
        })
    }
}

export {createBooking}