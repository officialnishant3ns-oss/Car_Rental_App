import mongoose from "mongoose"
const carSchema = new mongoose.Schema({
    carname: {
        type: String,
        required: true,
        trim: true,
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },
    year:{
        type:Number
    },
    
    category: {
        type: String,
        enum: ["sedan", "suv", "hatchback", "luxury", "van"],
        required: true,
        lowercase: true
    },

    fuelType: {
        type: String,
        enum: ["petrol", "diesel", "electric", "hybrid"],
        required: true,
        lowercase: true
    },

    seats: {
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
    transmission:{
        type:String
    },

    images: {
        type: [String],
        default: []
    },

    status: {
        type: String,
        enum: ["available", "booked", "maintenance"],
        default: "available",
        index: true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    location: {
        city: String,
        branch: String
    }
},
    {
        timestamps: true
    }
)

const Car = mongoose.model('Car', carSchema)
export default Car