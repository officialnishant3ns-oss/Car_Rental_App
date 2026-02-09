import React from "react"

const Testimonial = () => {
  return (
    <section className="w-full pt-15 flex justify-center mt-24 mb-28 px-6">
      <div className="max-w-7xl w-full">


        <div className="text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Don’t just take our words
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl">
            Hear what our users say about us. We’re always improving the experience
            for car owners and renters alike.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          <div className="group border border-slate-100 hover:border-slate-300 bg-white p-8 rounded-2xl h-full min-h-[260px]
            hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="flex gap-1 mb-4 text-amber-400">
              ★★★★★
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              Renting out my BMW was effortless. The platform feels premium and secure.
            </p>

            <div className="flex items-center gap-4 mt-10">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200"
                alt="user"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-amber-400 transition"
              />
              <div>
                <h4 className="font-medium text-slate-900">Richard Nelson</h4>
                <p className="text-sm text-slate-500">Luxury Car Owner</p>
              </div>
            </div>
          </div>

          <div className="group border border-slate-100 hover:border-slate-300 bg-white p-8 rounded-2xl h-full min-h-[260px]
            hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="flex gap-1 mb-4 text-amber-400">
              ★★★★★
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              Smooth booking, clean cars, and great support. Highly recommended.
            </p>

            <div className="flex items-center gap-4 mt-10">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                alt="user"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-amber-400 transition"
              />
              <div>
                <h4 className="font-medium text-slate-900">Ava Johnson</h4>
                <p className="text-sm text-slate-500">Frequent Renter</p>
              </div>
            </div>
          </div>

          <div className="group border border-slate-100 hover:border-slate-300 bg-white p-8 rounded-2xl h-full min-h-[260px]
            hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

            <div className="flex gap-1 mb-4 text-amber-400">
              ★★★★★
            </div>

            <p className="text-slate-500 text-sm leading-relaxed">
              Listing my car took minutes and the returns are amazing.
            </p>

            <div className="flex items-center gap-4 mt-10">
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200"
                alt="user"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-amber-400 transition"
              />
              <div>
                <h4 className="font-medium text-slate-900">Liam Carter</h4>
                <p className="text-sm text-slate-500">SUV Owner</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Testimonial
