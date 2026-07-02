import React from "react";
import { Calendar, Droplets } from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  getWeatherIcon,
  formatDate,
  formatTemperature,
} from "../utils/WeatherUtils";

function WeatherForecast({ forecast, unit }) {
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!acc[date]) {
      acc[date] = item;
    }

    return acc;
  }, {});

  const dailyItems = Object.values(dailyForecast).slice(0, 5);
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-white/10 rounded-full ">
          <Calendar className="w-6 h-6 text-white/80 " />
        </div>
        <h2 className="text-2xl font-bold text-white">5 Days Forecast</h2>
      </div>

      <div className="space-y-4">
        {/* MAP METHOD LOGIC */}
        {dailyItems.map((item, index) => {
          const iconName = getWeatherIcon(item.weather[0].description);
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

          return (
            <div key={index}
  className="grid grid-cols-4 items-center p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
>

              <IconComponent size={40}/>

              {/* Left Section */}
              <div className="min-w-[140px]">
                <div className="text-white font-semibold text-lg">
                  {/* CONDITIONAL DATE */}
                  {index === 0 ? "Today" : formatDate(item.dt)}
                </div>

                <div className="text-white/70 text-sm capitalize font-medium ">
                  {item.weather[0].description}
                </div>
              </div>

              {/* Center Section */}
              <div className="flex items-center justify-center gap-2 ml-8 ">
                <Droplets className="w-5 h-5 text-blue-300 " />
                {Math.round((item.pop || 0) * 100)}%
              </div>

              {/* Right Section */}
              <div className="text-right">
                <div className="text-white font-bold text-lg">{formatTemperature(item.main.temp_max, unit)}°</div>

                <div className="text-white/70 text-sm">{formatTemperature(item.main.temp_min, unit)}°</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;
