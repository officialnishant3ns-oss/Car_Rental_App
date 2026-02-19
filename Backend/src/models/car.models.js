import mongoose from "mongoose"
const carSchema = new mongoose.Schema({
   
    // owner: {
    //     type: mongoose.,
    //     ref:'User'
    // },

    brand: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number
    },
    model: {
        type: String
    },

    category: {
        type: String,
        required: true,
        lowercase: true
    },

    fuel_type: {
        type: String,
        lowercase: true
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
        type: String
    },

    image: {
        type: [String],
        default: []
    },

    isAvailable: {
        type: Boolean,
        default: true
    },
    location: {
      type:String
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