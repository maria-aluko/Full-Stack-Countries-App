import { useNavigate, useParams } from "react-router-dom";
import { Country } from "../../types/country";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from "../../store/slices/countriesSlice";
import { useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import WeatherInfo from "../WeatherInfo";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';

interface CountryCardProps {
    country: Country;
}

const CountryDetail = () => {
  const {name} = useParams();
  const countries = useAppSelector(selectAllCountries);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const selectedCountry = countries.find((country) => country.name.common.toLowerCase() === decodeURIComponent( name || '').toLowerCase());

  const handleBackClick = () => {
    navigate('/countries');
  }

  useEffect(() => {
    if (!selectedCountry) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, selectedCountry]);

    return (
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={2}>
        <Card sx={{ width: 600 }} >
          <CardMedia 
            component='img'
            image={selectedCountry?.flags.png}
            alt={selectedCountry?.name.common}
            height='300'
          />
          <CardContent>
            <Typography variant="h2">
              {selectedCountry?.name.common}
            </Typography>
            <Typography>
              <LocationCityIcon color="primary" />
              Capital: {selectedCountry?.capital}
            </Typography>
            <Typography>
              <PeopleIcon color="primary"/>
               Population: {selectedCountry?.population.toLocaleString()}
            </Typography>
            <Typography>
              Region: {selectedCountry?.region}
            </Typography>

            <Avatar src={`${selectedCountry?.flags.png}`} />
            
          </CardContent>
          <CardActions>
            <Button onClick={handleBackClick}>Back to Countries</Button>
          </CardActions>
        </Card>
        <Card sx={{ width: 600 }}>
          <CardContent>
            <Typography>
              Weather in {selectedCountry?.name.common} at the moment: 
            </Typography>
            {/* <WeatherInfo /> */}

          </CardContent>
          
        </Card>
      </Box>
        
    )
}

export default CountryDetail;