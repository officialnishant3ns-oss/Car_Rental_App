import React, { useState, useContext } from "react"
import Titleowner from "../../components/owner/Titleowner"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify"
// import api from "../../api/api"

const AddCar = () => {
  const { token,api } = useContext(AppContext)

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  })

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!car.category || !car.transmission || !car.fuel_type || !car.location) {
      return toast.error("Please select all dropdown fields")
    }

    const formData = new FormData()
    formData.append("brand", car.brand)
    formData.append("model", car.model)
    formData.append("year", car.year)
    formData.append("pricePerDay", car.pricePerDay)
    formData.append("category", car.category)
    formData.append("transmission", car.transmission)
    formData.append("fuel_type", car.fuel_type)
    formData.append("seating_capacity", car.seating_capacity)
    formData.append("location", car.location)
    formData.append("description", car.description)
    formData.append("image", image)

    try {
      setLoading(true)
      const res = await api.post("/car/addcar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Car listed successfully!")
      setCar({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        category: "",
        transmission: "",
        fuel_type: "",
        seating_capacity: "",
        location: "",
        description: ""
      })
      setImage(null)
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <Titleowner
        title="Add Car"
        subtitle="Fill in details to list a new car for booking, including availability and car specification"
      />
      <hr />
      <form
        className="flex flex-col gap-5 text-sm text-gray-700 mt-6 max-w-3xl"
        onSubmit={submitHandler}
      >
        <div className="flex items-center gap-5 w-full">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="h-20 border-1 border-amber-950 rounded-xl cursor-pointer"
              alt="Car Upload"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500">Upload a Picture of Car</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Brand</label>
            <input
              className="px-4 py-3 mt-1 border-2 border-amber-950 rounded-md"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              required
              type="text"
              name="brand"
              placeholder="e.g BMW, Mercedes, Audi..."
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="model">Model</label>
            <input
              className="px-4 py-3 mt-1 border-2 border-amber-950 rounded-md"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              required
              type="text"
              name="model"
              placeholder="e.g X5, E-class, M-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 mt-2">
          <div className="flex flex-col w-full">
            <label htmlFor="year">Year</label>
            <input
              className="px-4 py-3 mt-1 border-2 border-amber-950 rounded-md"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              required
              type="number"
              name="year"
              placeholder="2025"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="pricePerDay">Price Per Day</label>
            <input
              className="px-4 py-3 mt-1 border-2 border-amber-950 rounded-md"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              required
              type="number"
              name="pricePerDay"
              placeholder="Enter Price per Day"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={car.category}
              className="px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md"
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              required
            >
              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="transmission">Transmission</label>
            <select
              name="transmission"
              value={car.transmission}
              className="px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md"
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi Automatic">Semi Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="fuel_type">Fuel Type</label>
            <select
              name="fuel_type"
              value={car.fuel_type}
              className="px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md"
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="seating_capacity">Seat Capacity</label>
            <input
              className="px-4 py-3 mt-1 border-2 border-amber-950 rounded-md"
              value={car.seating_capacity}
              onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
              required
              type="number"
              name="seating_capacity"
              placeholder="e.g 2, 3, 4"
            />
          </div>
        </div>

        <div className="flex flex-col w-full mt-2">
          <label htmlFor="location">Location</label>
          <select
            name="location"
            value={car.location}
            className="px-4 py-3 mt-1 border-2 outline-none border-amber-950 rounded-md"
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            required
          >
            <option value="">Select Location</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="New York">New York</option>
            <option value="Houston">Houston</option>
          </select>
        </div>

        <div className="flex flex-col w-full mt-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="px-4 py-3 mt-1 border-2 h-30 border-amber-950 rounded-md"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            required
            name="description"
            placeholder="e.g A luxurious SUV with spacious interior and powerful engine"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-4 text-white bg-blue-600 cursor-pointer rounded-xl w-max mt-4"
        >
          <img src={assets.tick_icon} alt="" />
          {loading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  )
}

export default AddCar