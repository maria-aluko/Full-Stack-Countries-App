import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from '../../store/slices/countriesSlice';
import { Box } from '@mui/material';
import CountryCard from './CountryCard';
import { Country } from '../../types/country';

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries: Country[] = useAppSelector(selectAllCountries);
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);

useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  return (
    <Box sx={{ 
      p: 1, 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: 5 
    }}>
      {countries.map((country) => (
                <CountryCard key={country.name.common} country={country} />
            ))}
    </Box>
  );
}

export default CountriesList;