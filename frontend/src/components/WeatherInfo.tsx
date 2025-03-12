import { Box, Typography } from "@mui/material";
import { WeatherData } from "../types/weather";

interface WeatherInfoProps {
  weather: WeatherData;
}

const WeatherInfo = ({weather}: {weather: WeatherData}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" align="center">Current Weather</Typography>
      <Typography variant="body1" align="center">
        Temperature: {weather.main.temp}°C
      </Typography>
      <Typography variant="body1" align="center">
        Weather: {weather.weather[0].description}
      </Typography>
      <Typography variant="body1" align="center">
        Wind Speed: {weather.wind.speed} m/s
      </Typography>
    </Box>
  )
}

export default WeatherInfo;