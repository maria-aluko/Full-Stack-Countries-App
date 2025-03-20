import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryVisited } from "../types/visited";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { visitedApi } from "../api/services/visited";
import { Alert, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import CountryCard from "./Countries/CountryCard";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Visited = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visited, setVisited] = useState<CountryVisited[]>([]);
  const allCountries = useAppSelector(selectAllCountries);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchVisited = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await visitedApi.getVisited();
        setVisited(data);
      } catch (error) {
        console.error("Error fetching visited:", error);
        setError("Failed to load visited. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchVisited();
  }, [user]);

const convertToCountry = (visited: CountryVisited) => {
  const fullCountry = allCountries.find((country) => country.name.common === visited.country_name);
  if (fullCountry) {
    return fullCountry;
  }

  return {
    name: {
      common: visited.country_name,
      official: visited.country_name,
    },
    cca3: visited.country_code,
    flags: {
      png: visited.country_flag,
      svg: visited.country_flag,
    },
    region: "visited",
    subregion: "visited",
    population: 0,
    capital: ["visited"],
    currencies: {
      FAV: {
        name: "visited",
        symbol: "❤️",
      }
    },
    languages: ["visited language"],
    area: 0,
    // add here the parts of data i'm using also in the country card
  };
  
}
if(!user) {
  return <div>Please log in to see your visited countries</div>
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
      My visited Countries
    </Typography>

    {error && (
      <Alert severity="error" sx={{mb: 3}}>
        {error}
      </Alert>
    )}

    {
      visited.length === 0 ? (<Alert severity="info">
        You have no visited countries yet.
      </Alert>) : (<Grid container spacing={3}>
        {visited.map((visited) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={visited.id}>
            <CountryCard country={convertToCountry(visited)} />
          
          </Grid>
          ))
        }
      </Grid>)
    }
  </Box>
)

};

export default Visited;