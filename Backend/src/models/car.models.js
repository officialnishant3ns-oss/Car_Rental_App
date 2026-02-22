import mongoose from "mongoose"
const carSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true
    },

    fuel_type: {
        type: String,
    },

    seating_capacity: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },

    pricePerDay: {
        type: Number,
        required: true,
        min: 0
    },
    transmission: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const Car = mongoose.model('Car', carSchema)
export default Car