import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="text-white flex flex-col items-center justify-center space-y-2 my-6">
      
      {/* 🌍 Location Row */}
      <div className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold tracking-wide">
        <FaMapMarkerAlt className="text-red-400 drop-shadow" />
        <span>
          {name}, {country}
        </span>
      </div>

      {/* ⏱ Time Row */}
      <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300 font-light bg-white/5 px-4 py-1 rounded-full backdrop-blur-md">
        <FaClock className="text-cyan-300" />
        <span>{formattedLocalTime}</span>
      </div>

      {/* subtle divider line (like real apps) */}
      <div className="w-24 h-px bg-white/20 mt-2"></div>
    </div>
  );
};

export default TimeAndLocation;