import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryFavorite } from "../types/favorite";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { favoritesApi } from "../api/services/favorites";
import { Alert, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import CountryCard from "./Countries/CountryCard";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Favorites = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
  const allCountries = useAppSelector(selectAllCountries);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await favoritesApi.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, [user]);

const convertToCountry = (favorite: CountryFavorite) => {
  const fullCountry = allCountries.find((country) => country.name.common === favorite.country_name);
  if (fullCountry) {
    return fullCountry;
  }

  return {
    name: {
      common: favorite.country_name,
      official: favorite.country_name,
    },
    cca3: favorite.country_code,
    flags: {
      png: favorite.country_flag,
      svg: favorite.country_flag,
    },
    region: "Favorite",
    subregion: "Favorite",
    population: 0,
    capital: ["Favorite"],
    currencies: {
      FAV: {
        name: "Favorite",
        symbol: "❤️",
      }
    },
    languages: ["Favorite language"],
    area: 0,
    // add here the parts of data i'm using also in the country card
  };
  
}
if(!user) {
  return <div>Please log in to see your favorites</div>
}

if(loading) {
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", p:4}}>
      <CircularProgress />
    </Box>
}

return (
  <Box sx={{p:3}}>
    <Button
      color="primary"
      variant="contained"
      onClick={() => navigate('/countries')}
    >
      <ArrowBack/> All Countries
    </Button>
    <Typography variant="h4" textAlign='center' marginBottom='10' gutterBottom>
      My Favorites Countries
    </Typography>

    {error && (
      <Alert severity="error" sx={{mb: 3}}>
        {error}
      </Alert>
    )}

    {
      favorites.length === 0 ? (<Alert severity="info">
        You have no favorites yet.
      </Alert>) : (<Grid container spacing={3}>
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
            <CountryCard country={convertToCountry(favorite)} />
          
          </Grid>
          ))
        }
      </Grid>)
    }
  </Box>
)

};

export default Favorites;