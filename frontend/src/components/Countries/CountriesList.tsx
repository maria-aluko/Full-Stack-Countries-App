import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from '../../store/slices/countriesSlice';
import { Box, ListItem } from '@mui/material';
import CountryCard from './CountryCard';

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);

useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  // console.log(loading);
  // console.log(error);
  // console.log(selectedCountry);

  return (
    <Box sx={{ p: 3, gap: 2 }}>
      <CountryCard />
    </Box>
  )
}

export default CountriesList;