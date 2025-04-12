import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";
// import weather from "../src/assets/weather.png";
import axios from "axios";



const App = () => {

  const API_KEY = "7fc636916bcec0c30f36b6c9cc36975f";
  const [search, setSearch] = useState("");
  const [loading , setLoading]=useState(false);
  const [temp , setTemp]=useState(null);
  const [humidity , setHumidity]=useState(null);
  const [windSpeed , setWindSpeed]=useState(null);
  const [cityName , setCityName]=useState("");
  const [weatherIcon , setWeatherIcon]=useState("01d");


  const fetchWeather = async()=>{
    if (!search) {
      setLoading(true);
    }
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`);
      console.log(data)
      if(data.cod===200)
      {
        setTemp(data.main.temp)
        setHumidity(data.main.humidity)
        setWindSpeed(data.wind.speed)
        setCityName(data.name)
        setWeatherIcon(data.weather[0].icon)
      }
    }
    catch(error)
    {
      console.log(error);
      setCityName("city not found")
      setTemp(null)
      setHumidity(null)
      setWindSpeed(null)
      setWeatherIcon("01d")
    }
    setLoading(false)
  }
  return <>
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-950 to bg-yellow-600">
      <div className="flex items-center justify-end bg-white rounded-full px-4 py-2 mb-6 w-80">
        <input type="text" name="" id="" value={search}
          onChange={(e)=>setSearch(e.target.value)}
        placeholder="search" className="flex-1 text-black outline-none px-2" />
        <IoSearch 
        onClick={fetchWeather}
        className="text-grey-500 cursor-pointer" />
      </div>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" className="w-15 h-15 mb-5" />
      <h1 className="text-4xl font-bold mb-2 text-white">{loading?"loading...":temp!==null?`${temp}°C`:"_"} </h1>
      <h1 className="text-2xl font-semibold text-white mb-6">{cityName || "type to check temperature"}</h1>
      <div className="flex max-w-md flex-col md:flex-row  items-center md:items-start justify-center mt-5 w-full gap-40">
        <div className="flex flex-col items-center ">
          <WiHumidity className="text-3xl" />
          <span className="text-lg font-medium">{humidity!==null?`${humidity}%`:"_"}</span>
          <p className="text-sm">Humidity</p>
        </div>
        <div className="flex flex-col items-center ">
          <FaWind className="text-3xl" />
          <span className="text-lg font-medium">{windSpeed!==null?`${windSpeed}km/h`:"_"}</span>
          <p className="text-sm" >Wind Speed</p>
        </div>
      </div>

    </div>
  </>
}

export default App