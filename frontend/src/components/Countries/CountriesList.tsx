import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from '../../store/slices/countriesSlice';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import CountryCard from './CountryCard';
import { Country } from '../../types/country';
import { set } from 'mongoose';

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries: Country[] = useAppSelector(selectAllCountries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);

  useEffect(() => {
      dispatch(fetchAllCountries());
    }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const searchTermLowerCase = searchTerm.toLowerCase();
    const results = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTermLowerCase);
    }
    );
    setFilteredCountries(results);
    setLoading(false);
  }, [searchTerm, countries]);

  return (
    <Box>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
        Countries of the World
      </Typography>

      <Box sx={{ mx: 'auto', p: 2 }}>
      <TextField
        label='Search by country name'
        variant='outlined'
        fullWidth
        margin='normal'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </Box>

      {loading && <CircularProgress />}
      <Box sx={{ 
        p: 1, 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: 5 
      }}>
        {countries.map((country) => (
                  <CountryCard key={country.name.common} country={country} />
              ))}

        {filteredCountries.length === 0
          ? <Typography variant="h6" component="p" align="center">No countries found</Typography>
          : filteredCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
          ))}
      </Box>
    </Box>
  )
};

export default CountriesList;