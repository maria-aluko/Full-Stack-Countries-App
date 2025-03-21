import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectLoading } from '../../store/slices/countriesSlice';
import { useAuth } from "../../context/AuthContext";
import { Box, Button, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, Pagination } from '@mui/material';
import CountryCard from './CountryCard';
import { Country } from '../../types/country';

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const countries: Country[] = useAppSelector(selectAllCountries);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const loading = useAppSelector(selectLoading);
  const [region, setRegion] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

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
      filtered.sort((a, b) => a.population - b.population);
    } else if (sortOrder === 'descend') {
      filtered.sort((a, b) => b.population - a.population);
    }

    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchTerm, region, sortOrder, countries]);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRegion('');
    setSortOrder('');
  };

  const showClearButton = searchTerm || region || sortOrder;

  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
        Countries of the World
        {!user && (
          <Typography variant="body2" align="center" sx={{ fontStyle:"italic", color:"grey", mb: 2 }}>
          Log in to mark countries as visited and/or as favorite
          </Typography>)}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      <Box sx={{ width: { xs: '100%', sm: 500 }, maxWidth: 700 }}>
        <InputLabel 
          htmlFor="search-bar" 
          sx={{ display: 'block', visibility: searchTerm ? 'hidden' : 'visible' }} 
        >
          Search
        </InputLabel>
        
        <TextField
          label="Search by country name"
          id="search-bar"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '100%' }}
          InputLabelProps={{
            shrink: searchTerm.length > 0,
          }}
        />
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }}>
          <InputLabel id="region-select-label">Filter by Region</InputLabel>
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

        <Box sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }}>
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

      {showClearButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Box 
          sx={{ 
            p: 1, 
            display: 'grid', 
            gridTemplateColumns: 
            'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: 3, 
            width: '100%', 
            maxWdith: '1200px', 
            margin: '0 auto', 
            overflow: 'hidden' 
          }}>
          {currentCountries.length === 0 ? (
            <Typography variant="h6" component="p" align="center">
              No countries found
            </Typography>
          ) : (
            currentCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default CountriesList;
