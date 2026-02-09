import React from 'react'

export default function Newsletter() {
  return (
    <div className="mt-24  px-6">
      <div className="flex flex-col items-center justify-center text-center space-y-3">

        <h1 className="md:text-4xl text-2xl font-semibold">
          Never Miss a Deal!
        </h1>

        <p className="md:text-lg text-gray-800/70 pb-8 max-w-xl">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <form className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
          <input
            className="border border-gray-300 h-full w-full rounded-l-md outline-none px-4 text-gray-700 focus:border-indigo-500"
            type="email"
            placeholder="Enter your email address"
            required
          />

          <button
            type="submit"
            className="md:px-12 px-8 h-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all rounded-r-md"
          >
            Subscribe
          </button>
        </form>

      </div>
    </div>
  )
}
