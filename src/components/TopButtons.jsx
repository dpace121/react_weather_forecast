import React, { useState } from "react";

const TopButtons = ({ setQuery }) => {
  const [activeCity, setActiveCity] = useState("London");

  const cities = [
    { id: 1, name: "London" },
    { id: 2, name: "Sydney" },
    { id: 3, name: "Tokyo" },
    { id: 4, name: "Paris" },
    { id: 5, name: "Toronto" },
  ];

  const handleClick = (city) => {
    setQuery({ q: city.name });
    setActiveCity(city.name);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => handleClick(city)}
          className={`
            px-4 py-2 rounded-full text-sm sm:text-base
            transition-all duration-300
            backdrop-blur-md border
            hover:scale-105
            ${
              activeCity === city.name
                ? "bg-white text-black border-white shadow-lg"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }
          `}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;