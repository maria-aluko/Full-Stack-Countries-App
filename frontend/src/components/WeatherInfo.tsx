import { Box, Typography } from "@mui/material";
import { WeatherData } from "../types/weather";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

interface WeatherInfoProps {
  weather: WeatherData;
}

const WeatherInfo = ({weather}: {weather: WeatherData}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" align="center">Current Weather in the capital</Typography>
      <Typography variant="body1" align="center" style={{
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%" 
            }}>
        <ThermostatIcon color="primary"/> Temperature: {weather.main.temp}°C
      </Typography>
      <Typography variant="body1" align="center" style={{
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%" 
            }}>
        <CloudQueueIcon color="primary" /> Weather: {weather.weather[0].description}
      </Typography>
      <Typography variant="body1" align="center" style={{
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%" 
            }}>
        <AirIcon color="primary"/> Wind Speed: {weather.wind.speed} m/s
      </Typography>
    </Box>
  )
}

export default WeatherInfo;