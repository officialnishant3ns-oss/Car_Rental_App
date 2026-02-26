import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Cardetails = () => {
  const { car, api } = useContext(AppContext)
  const { id } = useParams()
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [CAr, setCAr] = useState(null)
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    if (car?.length) {
      const foundCar = car.find(c => c._id === id)
      setCAr(foundCar || null)
    }
  }, [id, car])

  const navigate = useNavigate()

  // console.log('cardetail', car)
  // console.log('CAr', CAr)


  const BookingCar = async (e) => {
    e.preventDefault()


    if (returnDate <= pickupDate)
      return toast.error("Return date must be after pickup date")

    try {
      setLoading(true)
      const { data } = await api.post('/booking/createbooking',
        {
          carId: id,
          pickupDate,
          returnDate
        })
      if (data.success) {
        toast.success("Booking Created SuccessFully")

        setPickupDate('')
        setReturnDate('')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        "Something went wrong"

      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }


  if (!CAr) return <Loader />
  return car ? (
    <div className='px-6 mt-15'>
      <button
        className='flex items-center gap-2 mb-6 ml-13'
        onClick={() => navigate(-1)} >
        <img src={assets.arrow_icon} className='rotate-180' alt="" />
        Back to all Car
      </button>



      <div className='grid grid-cols-3 gap-12 pl-13 pr-13'>

        <div className='col-span-2 mb-25 '>
          <img src={CAr.image} alt="" className='w-full object-cover mb-6 h-120 rounded-2xl' />
          <div>    <h1 className='text-4xl font-semibold mb-3'>{CAr.brand}   {CAr.model}</h1>
            <p className='text-lg  font-serif'>{CAr.year}  {CAr.category}</p>
          </div>
          <hr />
          <div className="grid grid-cols-4 gap-4 mt-6">
            {[
              { icon: assets.users_icon, text: `${CAr.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: CAr.fuel_type },
              { icon: assets.location_icon, text: CAr.location },
              { icon: assets.carIcon, text: CAr.transmission }
            ].map(({ icon, text }, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 border rounded-xl"
              >
                <img src={icon} alt="" className="w-8 h-8" />
                <p className="text-sm font-medium">{text}</p>
              </div>
            ))}
          </div>
          <div className='mb-5 mt-6'>
            <h1 className='text-2xl font-normal'>Description</h1>
            <p className='text-gray-500 '>{CAr.description}</p>

          </div>
          <div className='mt-1'>
            <h1 className='font-semibold text-2xl mb-2'>Features</h1>
            <div className='grid grid-cols-2'>
              {[
                '360 Camera', 'GPS', 'heated Seats', 'Rear view'
              ].map((item) => (
                <li className='flex items-center text-gray-600 gap-3  ' key={item}>
                  <img src={assets.check_icon} alt="" />
                  {item}
                </li>
              ))}
            </div>
          </div>
        </div>



        <div>
          <form
            onSubmit={BookingCar}
            action="" className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
            <div className='flex justify-between items-center'>
              <p className='font-bold text-black text-2xl'>$ {CAr.pricePerDay}</p>
              <span> Per Day</span>
            </div>
            <hr className="border-borderColor my-6" />
            <div className="flex flex-col items-start">
              <label htmlFor="pickup-date">PickUp Date</label>
              <input
                type="date"
                id='pickup-date'
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="border  border-borderColor px-3 py-2 w-90 rounded-lg text-gray-600  mt-3 outline-none cursor-pointer"
                required

              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="return-date">Return Date</label>
              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                id='return-date'
                min={new Date().toISOString().split('T')[0]}
                className="border border-borderColor px-5 w-90 py-3 cursor-pointer rounded-lg"
                required

              />
            </div>
            <button className='w-full bg-blue-500 hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'
              disabled={Loading}
            >
              {Loading ? "Processing..." : "Book Now"}
            </button>


          </form>
        </div>
      </div>
    </div>
  ) : <Loader />
}

export default Cardetails
