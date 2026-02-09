const Footer = () => {
  return (
    <footer className="bg-gray-200 pt-17  text-gray-900 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

    
        <div>
          <h1 className="text-2xl font-bold text-black">CarRental</h1>
          <p className="mt-3 text-sm leading-relaxed">
            Rent premium cars at affordable prices. Easy booking, trusted service,
            and 24/7 customer support.
          </p>
        </div>

      
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-gray-600 cursor-pointer">Home</li>
            <li className="hover:text-gray-600 cursor-pointer">Cars</li>
            <li className="hover:text-gray-600 cursor-pointer">Bookings</li>
            <li className="hover:text-gray-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Services</h2>
          <ul className="space-y-2 text-sm">
            <li>Luxury Cars</li>
            <li>Affordable Rentals</li>
            <li>Long Term Hire</li>
            <li>Airport Pickup</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Contact</h2>
          <p className="text-sm">📍 New Delhi, India</p>
          <p className="text-sm mt-1">📞 +91 88100 729 10</p>
          <p className="text-sm mt-1">✉ support@carrental.com</p>
        </div>
      </div>

     
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} CarRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
