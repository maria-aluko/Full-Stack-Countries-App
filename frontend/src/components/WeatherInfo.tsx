import { WeatherData } from "../types/weather";

interface WeatherInfoProps {
  weather: WeatherData;
}

const WeatherInfo = ({weather}: {weather: WeatherData}) => {
  console.log(weather);
  return (
    <div>Some weather info</div>
  )
}

export default WeatherInfo;