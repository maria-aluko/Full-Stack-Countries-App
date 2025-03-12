import { WeatherData } from "../../types/weather";
import { api } from "../axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = {
    getWeather: (city: string): Promise<WeatherData> => 
        api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
}