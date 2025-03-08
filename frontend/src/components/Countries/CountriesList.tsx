import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectError, selectLoading } from '../../store/slices/countriesSlice';
import { Box, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import CountryCard from './CountryCard';
import { Country } from '../../types/country';

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries: Country[] = useAppSelector(selectAllCountries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const loading = useAppSelector(selectLoading);
  const [region, setRegion] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
      dispatch(fetchAllCountries());
    }, [dispatch]);

  useEffect(() => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTermLowerCase);
      const matchesRegion = region ? country.region.toLowerCase() === region.toLowerCase() : true;
      return matchesSearch && matchesRegion;
    });

    if (sortOrder === 'ascend') {
      filtered.sort((a, b) => a.population - b.population); // Ascending order
    } else if (sortOrder === 'descend') {
      filtered.sort((a, b) => b.population - a.population); // Descending order
    }

    setFilteredCountries(filtered);
  }, [searchTerm, region, sortOrder, countries]);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
        Countries of the World
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
        <TextField
          label="Search by country name"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        
        <Box sx={{ width: '200px' }}>
          <InputLabel id="region-select-label">Region</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            value={region}
            label="Region"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value=""><em>All Regions</em></MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: '200px' }}>
          <InputLabel id="population-sort-label">Sort by Population</InputLabel>
          <Select
            labelId="population-sort-label"
            id="population-sort"
            value={sortOrder}
            label="Sort by Population"
            onChange={handleSortChange}
            fullWidth
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="ascend">Lowest to Highest</MenuItem>
            <MenuItem value="descend">Highest to Lowest</MenuItem>
          </Select>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ p: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 5 }}>
          {filteredCountries.length === 0
            ? <Typography
              variant="h6"
              component="p" 
              align="center"
            >
              No countries found
            </Typography>
            : filteredCountries.map((country) => (
                <CountryCard key={country.name.common} country={country} />
              ))
          }
        </Box>
      )}
    </Box>
  );
};


export default CountriesList;