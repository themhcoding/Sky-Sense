import React, { useState, useEffect } from "react";
import {
  MapPin,
  Sunrise,
  Sunset,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
} from "lucide-react";
import {
  getWeatherIcon,
  formatTemperature,
  formatTime,
  getWindDirection,
} from "../utils/WeatherUtils";

import * as LucideIcons from "lucide-react";

function WeatherCard({ weather, forecast, unit }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const cityTime = new Date(
    currentTime.getTime() +
      weather.timezone * 1000 +
      currentTime.getTimezoneOffset() * 60 * 1000,
  );

  const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  const countryName = regionNames.of(weather.sys.country);
  // Today's forecast
  const today = new Date(cityTime).toDateString();

  const todayForecast = forecast.list.filter((item) => {
    return new Date(item.dt * 1000).toDateString() === today;
  });

  const highTemps = todayForecast.map((item) => item.main.temp_max);
  const lowTemps = todayForecast.map((item) => item.main.temp_min);

  console.log("Current Temp:", weather.main.temp);
console.log("Forecast Highs:", highTemps);
console.log("Forecast Lows:", lowTemps);
console.log("Computed High:", Math.max(...highTemps));
console.log("Computed Low:", Math.min(...lowTemps));
console.log("Today's Forecast:", todayForecast);

  // Get forecast high/low (or fallback to current API values)
let highTemp =
  highTemps.length > 0 ? Math.max(...highTemps) : weather.main.temp_max;

let lowTemp =
  lowTemps.length > 0 ? Math.min(...lowTemps) : weather.main.temp_min;

// Current temperature
const currentTemp = weather.main.temp;

if (highTemp < currentTemp) {
  highTemp = currentTemp;
}

if (lowTemp > currentTemp) {
  lowTemp = currentTemp;
}

  const iconName = getWeatherIcon(weather.weather[0].description);
  console.log(
    weather.name,
    weather.weather[0].main,
    weather.weather[0].description,
  );

  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
  const getWeatherTheme = (description) => {
    const weather = description.toLowerCase();

    if (weather.includes("clear")) {
      return {
        icon: "text-yellow-400",
        bg: "bg-yellow-500/15",
      };
    }

    if (weather.includes("rain") || weather.includes("drizzle")) {
      return {
        icon: "text-blue-400",
        bg: "bg-blue-500/15",
      };
    }

    if (weather.includes("thunder")) {
      return {
        icon: "text-purple-400",
        bg: "bg-purple-500/15",
      };
    }

    if (weather.includes("snow")) {
      return {
        icon: "text-cyan-200",
        bg: "bg-cyan-500/15",
      };
    }

    if (
      weather.includes("mist") ||
      weather.includes("fog") ||
      weather.includes("haze") ||
      weather.includes("smoke")
    ) {
      return {
        icon: "text-slate-300",
        bg: "bg-slate-500/15",
      };
    }

    if (weather.includes("cloud")) {
      return {
        icon: "text-gray-300",
        bg: "bg-gray-500/15",
      };
    }

    return {
      icon: "text-white",
      bg: "bg-white/10",
    };
  };

  const theme = getWeatherTheme(weather.weather[0].description);

  const WeatherStats = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-300",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "text-green-300",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      color: "text-cyan-300",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      color: "text-purple-300",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-orange-300",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500  max-w-7xl w-full mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-full">
            <MapPin className="w-5 h-5 text-white/80" />
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg">{weather.name}</h2>
            <p className="text-white/60 text-sm">{countryName}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-white text-lg font-semibold">
            {/* DISPLAY DATE */}
            {cityTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-white/70 text-lg">
            {/* DISPLAY DATE */}
            {cityTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* WEATHER DISPLAY */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className="text-6xl font-bold text-white mb-3 tracking-tight">
            {formatTemperature(weather.main.temp, unit)}°
            <span className="text-4xl font-normal text-white/70">{unit}</span>
          </div>

          <div className="text-white/90 text-xl capitalize mb-2 font-medium">
            {weather.weather[0].description}
          </div>

          <div className="flex items-center space-x-4 text-white/60 text-sm">
            <span>Today's High: {formatTemperature(highTemp, unit)}°</span>
            <span>Today's Low: {formatTemperature(lowTemp, unit)}°</span>
          </div>
        </div>
        <div
          className={` transform hover:scale-110 transition-all duration-300`}
        >
          <IconComponent
            size={70}
            className={`${theme.icon} drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]`}
          />
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-5 mb-6">
        {/* MAP METHOD (FIXED FOR FULL WIDTH) */}
        {WeatherStats.map((stat, index) => {
          return (
            <div
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group flex items-center justify-between ${
                index === 4 ? "col-span-2 max-w-[48%] mx-auto w-full" : "w-full"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all">
                  {/* ICON */}
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>

                <div className="flex flex-col">
                  <span className="text-white/80 text-sm font-medium">
                    {stat.label}
                  </span>

                  <span className="text-white font-semibold text-lg ml-2">
                    {stat.value}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TIME */}
      {/* TIME */}
      <div className="flex gap-4">
        {/* Sunrise Card */}
        <div className="flex-1 bg-linear-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-5 border border-orange-400/20 flex items-center space-x-4">
          <div className="p-2 bg-orange-400/20 rounded-xl">
            <Sunrise className="w-5 h-5 text-orange-300" />
          </div>
          <div>
            <div className="text-white/80 text-sm font-medium">Sunrise</div>
            <div className="text-white font-semibold text-lg">

              {/* DYNAMIC CONTENT */}
{formatTime(weather.sys.sunrise)}
            </div>
          </div>
        </div>

        {/* Sunset Card */}
        <div className=" flex-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-5 border border-purple-400/20 flex items-center space-x-4">
          <div className="p-2 bg-purple-400/20 rounded-xl">
            <Sunset className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <div className="text-white/80 text-sm font-medium">Sunset</div>
            <div className="text-white font-semibold text-lg">
              {/* DYNAMIC CONTENT */}

              {formatTime(weather.sys.sunset)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
