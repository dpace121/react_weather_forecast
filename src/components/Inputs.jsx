import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const [activeUnit, setActiveUnit] = useState("metric");

  const handleSearchClick = () => {
    if (city.trim() !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-6 px-4">
      
      {/* 🔍 Search Box */}
      <div className="flex items-center w-full sm:w-3/4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg px-4 py-2">
        
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          type="text"
          placeholder="Search city..."
          className="flex-1 bg-transparent text-white placeholder-gray-300 text-lg outline-none"
        />

        {/* Search Icon */}
        <BiSearch
          onClick={handleSearchClick}
          size={28}
          className="cursor-pointer text-white transition-transform duration-300 hover:scale-125"
        />

        {/* Location Icon */}
        <BiCurrentLocation
          size={28}
          onClick={handleLocationClick}
          className="ml-3 cursor-pointer text-white transition-transform duration-300 hover:scale-125"
        />
      </div>

      {/* 🌡 Unit Toggle */}
      <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg">
        
        <button
          onClick={() => {
            setUnits("metric");
            setActiveUnit("metric");
          }}
          className={`px-3 py-1 rounded-xl text-lg font-medium transition ${
            activeUnit === "metric"
              ? "bg-white text-black"
              : "text-white hover:bg-white/20"
          }`}
        >
          °C
        </button>

        <span className="text-white mx-1">|</span>

        <button
          onClick={() => {
            setUnits("imperial");
            setActiveUnit("imperial");
          }}
          className={`px-3 py-1 rounded-xl text-lg font-medium transition ${
            activeUnit === "imperial"
              ? "bg-white text-black"
              : "text-white hover:bg-white/20"
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;