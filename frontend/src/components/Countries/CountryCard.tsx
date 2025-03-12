import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { Country } from '../../types/country';
import FavoriteButton from "../FavoriteButton";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import { Place } from "@mui/icons-material";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const navigate = useNavigate();
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
      />
      <Typography variant="h6" component="h2" align="center">
        {country.name.common}
      </Typography>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 1 }}>
        <Button
          onClick={() => handleCountryClick(country.name.common)}
          sx={{ marginTop: 2 }}
          color="primary"
        >
          See More
        </Button>
        <FavoriteButton country={country} />
      </Box>
    </Card>
  );
}

export default CountryCard;