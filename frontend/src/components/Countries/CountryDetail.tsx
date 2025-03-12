import { useParams, useNavigate } from "react-router-dom"; 
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from "../../store/slices/countriesSlice";
import { useEffect } from "react";
import { Box, Card, CardMedia, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { fetchWeather, selectWeather, selectWeatherLoading, selectWeatherError } from "../../store/slices/weatherSlice";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import WeatherInfo from "../WeatherInfo";

const CountryDetail = () => {
  const {name} = useParams();
  const countries = useAppSelector(selectAllCountries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const currentWeather = useAppSelector(selectWeather)[0];
  const weatherLoading = useAppSelector(selectWeatherLoading);
  const weatherError = useAppSelector(selectWeatherError);

  const nameDecoded = decodeURIComponent(name || "").toLowerCase();
  const selectedCountry = countries.find((country) => country.name.common.toLowerCase() === nameDecoded);
  console.log(selectedCountry);

  useEffect(() => {
    if (!selectedCountry) {
      dispatch(fetchAllCountries());
    }
    if(error){
      console.log(error);
    }
  }, [dispatch, selectedCountry, error]);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital.length > 0) {
      const capital = selectedCountry.capital[0];
      dispatch(fetchWeather(capital));
    }
  }, [dispatch, selectedCountry]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
      <Button variant="contained" color="primary" onClick={() => navigate('/countries')}>
        Go Back
      </Button>
      <Card sx={{ width: 600, paddingBottom: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : selectedCountry ? (
          <>
            <CardMedia
              component="img"
              image={selectedCountry.flags.png}
              alt={selectedCountry.name.common}
              height="300"
            />
            <Typography variant="h3" align="center">
              {selectedCountry.name.common}
            </Typography>
            <Typography variant="h5" align="center">
              {selectedCountry.region} | {selectedCountry.subregion}
            </Typography>
            <Typography variant="body1" align="center" style={{
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%" 
            }}>
              <LocationCityIcon/> Capital: {selectedCountry.capital && selectedCountry.capital.join(", ")}
            </Typography>
            <Typography variant="body1" align="center" style={{
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              width: "100%" 
            }}>
              <PeopleIcon/> Population: {selectedCountry.population.toLocaleString()}
            </Typography>
            <Typography variant="body1" align="center">
              Area: {selectedCountry.area.toLocaleString()} km²
            </Typography>
            <Typography variant="body1" align="center">
              Languages: {selectedCountry.languages ? Object.values(selectedCountry.languages).join(", ") : "N/A"}
            </Typography>
          </>
        ) : (
          <Alert severity="warning">Country not found</Alert>
        )}
      </Card>

      <Card sx={{ width: 600, paddingBottom: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={2}>
          {weatherLoading ? (
            <CircularProgress />
          ) : weatherError ? (
            <Alert severity="error">{weatherError}</Alert>
          ) : currentWeather ? (
            <WeatherInfo weather={currentWeather} />
          ) : (
            <Alert severity="warning">Weather data unavailable</Alert>
          )}
        </Box>
        </Card>
    </Box>
  );
}

export default CountryDetail;