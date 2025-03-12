import { useNavigate } from "react-router-dom";
import { Button, Card, CardMedia, Typography } from "@mui/material";
import { Country } from '../../types/country';
import FavoriteButton from "../FavoriteButton";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import { Place } from "@mui/icons-material";
import { ThemeContext } from "../../theme/themeContext";
import { useContext } from "react";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext) || { theme: 'light' }; 
  const handleCountryClick = (countryName: string) => {
    navigate(`/countries/${countryName}`);
  }

  return (     
    <Card key={country.cca3}
      sx={{ width: '100%',
        maxWidth: 350,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box', 
      }}>
      <CardMedia
        component="img"
        image={country.flags.png}
        alt={country.name.common}
        height={180}
        onClick={() => handleCountryClick(country.name.common)} 
        sx={{ "&:hover": { cursor: "pointer" } }}
      />
      <Typography variant="h6" component="h2" align="center">
        {country.name.common}
      </Typography>

      <FavoriteButton country={country} />

      <Typography variant="body2" color="textSecondary" align="center" style={{
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        width: "100%" 
      }}>
        <Place /> {country.region}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" style={{
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        width: "100%" 
      }}>
        <LocationCityIcon /> {country.capital}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" style={{
        display: "inline-flex", 
        alignItems: "center", 
        justifyContent: "center",
        width: "100%" 
      }}>
        <PeopleIcon />{country.population.toLocaleString()}
      </Typography>
      <Button
        onClick={() => handleCountryClick(country.name.common)}
        sx={{ m: 2, width: 200, alignSelf: 'center',
          backgroundColor: theme === 'light' ? '#1976d2' : '#ff9100',
          '&:hover': {
          backgroundColor: theme === 'light' ? '#1565c0' : '#b26500',
          },
          cursor: 'pointer', }}
        color="primary"
        variant="contained"
      >
        See More
      </Button>
    </Card>
  );
}

export default CountryCard;