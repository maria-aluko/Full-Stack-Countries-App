import { WeatherData } from "../../types/weather";
import { api } from "../axios";

const API_KEY = '13c9055f07b50ee9498f3df999ae6d4f';

export const weatherApi = {
    getWeather: (coordinates: [number, number]): Promise<WeatherData> => 
        api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${API_KEY}`)
}

// export const weatherApi = {
//     getCoordinates: async (city: string, country: string) => {
//         const response = await api.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`);
//         return response.data;
//     },
    
//     getWeather: async (coordinates: [number, number]): Promise<WeatherData> => {
//         const [lat, lon] = coordinates;
//         const response = await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
//         return response.data;
//     }
// };