export const getWeatherIcon = (description) => {
  const weather = description.toLowerCase();

  if (weather.includes("clear")) return "Sun";

  if (weather.includes("thunder")) return "CloudLightning";

  if (weather.includes("rain")) return "CloudRain";

  if (weather.includes("drizzle")) return "CloudDrizzle";

  if (weather.includes("snow")) return "CloudSnow";

  if (
    weather.includes("mist") ||
    weather.includes("fog") ||
    weather.includes("haze") ||
    weather.includes("smoke")
  )
    return "CloudFog";

  if (weather.includes("cloud")) return "Cloud";

  return "Cloud";
};


export const formatTemperature = (temp, unit) => {
  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32);
  }

  return Math.round(temp);
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (timestamp) => {
return new Date(timestamp * 1000).toLocaleDateString("en-US", {
weekday: "short",
day: "numeric",
month: "short",

});
};

export const getWindDirection = (deg) => {
const directions = [
"N",
"NNE",
"NE",
"ENE",
"E",
"ESE",
"SE",
"SSE",
"S",
"SSW",
"SW",
"WSW",
"W",
"WNW",
"NW",
"NNW",
];

return directions[Math.round(deg / 22.5) % 16];
};