import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { Country } from '../../types/country';
import FavoriteButton from "../FavoriteButton";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const navigate = useNavigate();
  const handleCountryClick = (countryName: string) => {
    navigate(`/countries/${countryName}`);
  }

  return (
    <div>      
      <Card key={country.cca3} sx={{ width: 300, margin: 1 }}>
        <CardMedia
          component="img"
          image={country.flags.png}
          alt={country.name.common}
          height={180}
        />
        <Typography variant="h6" component="h2" align="center">
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {country.region}
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
  </div>
  );
}

export default CountryCard;