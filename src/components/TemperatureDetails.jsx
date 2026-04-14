import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TemperatureDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg text-white">
      
      {/* Weather Condition */}
      <div className="flex items-center justify-center text-xl text-cyan-300 mb-4">
        <p className="tracking-wide">{details}</p>
      </div>

      {/* Main Temperature Section */}
      <div className="flex items-center justify-between">
        
        {/* Icon */}
        <img
          src={icon}
          alt="weather icon"
          className="w-24 drop-shadow-lg"
        />

        {/* Temperature */}
        <p className="text-6xl font-semibold">{`${temp.toFixed()}°`}</p>

        {/* Vertical Details */}
        <div className="flex flex-col space-y-3">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex items-center text-sm hover:scale-105 transition"
            >
              <Icon size={18} className="mr-2 text-cyan-300" />
              <span className="text-gray-200">
                {title}:
                <span className="font-medium ml-1 text-white">{value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div
            key={id}
            className="flex flex-col items-center bg-white/10 rounded-xl p-3 hover:bg-white/20 transition"
          >
            <Icon size={28} className="mb-1 text-yellow-300" />
            <p className="text-sm text-gray-300">{title}</p>
            <p className="font-medium text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureDetails;