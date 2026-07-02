import React from "react";
import SearchBar from "./Components/SearchBar";
import bgImage from "./assets/BG1.jpg";
import Temperature from "./Components/Temperature";
import LoadingSpinner from "./Components/LoadingSpinner";
import Error from "./Components/Error";
import WeatherCard from "./Components/WeatherCard";
import WeatherForecast from "./Components/WeatherForecast";
import { useWeather } from "./hooks/useWeather";

const handleRetry = () => {
  if (currentWeather) {
    fetchWeatherByCity(currentWeather.name);
  } else {
    fetchWeatherByCity("Islamabad");
  }
};

function App() {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  } = useWeather();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
      </div>

      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-light">
                Sky
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Sense
                </span>
              </h1>

              <p className=" text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                {"  "}
                Get real-time weather updates with clarity and precision.
                SkySense delivers accurate forecasts, live conditions, and a
                smooth visual experience for any location worldwide.
              </p>
            </div>
            <div className=" flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 m-12">
              <SearchBar
                onSearch={fetchWeatherByCity}
                onLocationSearch={fetchWeatherByLocation}
                loading={loading}
              ></SearchBar>
              <Temperature unit={unit} toggleUnit={toggleUnit}></Temperature>
            </div>
          </div>

          {/* MAIN */}
          <div className="space-y-8">
            {/* CONDITIONAL RENDERING */}

            {loading && (
              <div className="flex justify-center ">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 w-full max-w-md">
                  <LoadingSpinner></LoadingSpinner>
                  <p className="text-white/80 text-center mt-4 font-medium ">
                    Fetching Current Conditions...
                  </p>
                </div>
              </div>
            )}
            {/* CONDITIONAL RENDERING */}
            {error && !loading && (
              <div className="max-w-2xl mx-auto ">
                <Error message={error} onRetry={handleRetry}></Error>
              </div>
            )}

            {/* CONDITIONAL RENDERING */}

            {currentWeather && !loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 ">
                  <WeatherCard
                    weather={currentWeather}
                    forecast={forecast}
                    unit={unit}
                  />
                </div>
                <div className="xl:col-span-1">
                  {/* CONDITIONAL RENDERING  */}

                  {forecast && <WeatherForecast forecast= {forecast} unit= {unit}></WeatherForecast>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
