import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllCountries, selectAllCountries, selectLoading } from '../../store/slices/countriesSlice';
import { Box, Button, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  return (
    <Box>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
        Countries of the World
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TextField
          label="Search by country name"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '100%', maxWidth: 500 }}
        />
      </Box>
        
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Box sx={{ width: '200px' }}>
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

      {showClearButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
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
            overflow: 'hidden' }}>
          {currentCountries.length === 0 ? (<Typography
              variant="h6"
              component="p" 
              align="center"
            >
              No countries found
            </Typography>
           ) : ( currentCountries.map((country) => (
                <CountryCard key={country.name.common} country={country} />
              ))
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>

    </Box>
  );
};


export default CountriesList;