import React from "react";

const Loader = ({ size = 40, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
   
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
        style={{ width: size, height: size }}
      />

     
      {text && (
        <p className="text-gray-600   text-2xl font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
