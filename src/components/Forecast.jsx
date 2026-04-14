import React from 'react'

const Forecast = ({ title, data }) => {
  return (
    <div className="mt-6">
      
      {/* Title */}
      <div className="flex items-center justify-start">
        <p className="font-semibold uppercase tracking-wide text-gray-200">
          {title}
        </p>
      </div>

      <hr className="my-2 border-gray-500/30" />

      {/* Forecast Cards */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
        {data.map((d, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center justify-center
              bg-white/10 backdrop-blur-md
              rounded-2xl px-4 py-3
              min-w-20
              transition-all duration-300
              hover:scale-110 hover:bg-white/20
              hover:shadow-lg hover:shadow-black/30
              cursor-pointer
            "
          >
            {/* Time / Day */}
            <p className="font-light text-sm text-gray-200">
              {d.title}
            </p>

            {/* Icon */}
            <img
              src={d.icon}
              alt="weather icon"
              className="w-12 my-2 transition-transform duration-300 hover:rotate-12"
            />

            {/* Temperature */}
            <p className="font-semibold text-lg text-white">
              {`${d.temp.toFixed()}°`}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast