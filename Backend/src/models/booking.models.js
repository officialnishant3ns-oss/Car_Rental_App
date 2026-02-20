import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pickupdate: {
        type: Date,
        required: true
    },

    returnupdate: {
        type: Date,
        required: true
    },
    totalprice: {
        type: Number
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELED'],
        default: 'PENDING'
    },
    // paymentstatus: {
    //     type: String,
    //     enum: ['PENDING', 'PAID', 'FAILED'],
    //     default: 'PENDING'
    // }

},
    {
        timestamps: true
    })

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking