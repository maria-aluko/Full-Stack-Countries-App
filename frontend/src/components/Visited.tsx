import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryVisited } from "../types/visited";
import { useAppSelector } from "../store/hooks";
import { selectAllCountries } from "../store/slices/countriesSlice";
import { visitedApi } from "../api/services/visited";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import VisitedMap from "./VisitedMap";
import { fetchAllCountries } from "../store/slices/countriesSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

const Visited = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visited, setVisited] = useState<CountryVisited[]>([]);
  const allCountries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [dispatch, allCountries.length]);

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

  const visitedCountryCodes = visited.map((v) => v.country_code);
  const totalCountries = allCountries.length;
  const percentVisited =
    totalCountries > 0
      ? ((visited.length / totalCountries) * 100).toFixed(2)
      : "0.00";

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
    <Box sx={{ pt: 3 }}>
      <Typography variant="h4" textAlign="center" marginBottom="10" gutterBottom>
        Countries I've Visited
      </Typography>

      {error && (
        <Typography color="error" textAlign="center" gutterBottom>
          {error}
        </Typography>
      )}

      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        You have visited {visited.length} out of {totalCountries} countries ({percentVisited}%)
      </Typography>

      <VisitedMap visitedCountries={visitedCountryCodes} />
    </Box>
  );
};

export default Visited;