import React from "react"
import { assets } from "../assets/assets"

const Banner = () => {
  return (
    <section className="w-full bg-gray-200 flex justify-center ">
      <div className="w-full max-w-6xl bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 text-white shadow-lg">

   
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Do you own a <span className="text-amber-300">luxury car</span>?
          </h1>

          <p className="text-sm md:text-base text-white/90 mt-5">
            Turn your premium vehicle into a source of income. List your car
            and reach thousands of verified renters looking for luxury rides.
          </p>

          <p className="text-yellow-500 text-xl pt-4">Go to List Car</p>
        </div>

        <div className="flex-shrink-0">
          <img
            src={assets.banner_car_image}
            alt="Luxury car"
            className="h-48 md:h-60 object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default Banner
