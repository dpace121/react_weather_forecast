import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

/* =========================
   FETCH WEATHER DATA
========================= */
const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);

  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Weather API Error");
  }

  return res.json();
};

/* =========================
   ICON URL
========================= */
const iconUrlFromCode = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

/* =========================
   FORMAT TIME
========================= */
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy | hh:mm a"
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};

/* =========================
   CURRENT WEATHER FORMAT
========================= */
const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime: formatToLocalTime(dt, timezone),
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    dt,
    timezone,
    lat,
    lon,
  };
};

/* =========================
   FORECAST FORMAT (5 DAYS fallback)
========================= */
const formatForecastWeather = (secs, offset, data) => {
  // 🌤 Hourly (next 5 entries)
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // 📅 Daily (grouped by midnight)
  const daily = data
    .filter((f) => f.dt_txt?.includes("00:00:00"))
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

/* =========================
   MAIN FUNCTION
========================= */
const getFormattedWeatherData = async (searchParams) => {
  try {
    const currentData = await getWeatherData("weather", searchParams);
    const formattedCurrentWeather = formatCurrent(currentData);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const forecastData = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });

    const formattedForecastWeather = formatForecastWeather(
      dt,
      timezone,
      forecastData.list
    );

    return {
      ...formattedCurrentWeather,
      ...formattedForecastWeather,
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
};

export default getFormattedWeatherData;
