import { useAppSelector } from '../store/hooks';
import { Box, Typography } from '@mui/material';
import CountryCard from './Countries/CountryCard';


const VisitedCountriesPage = () => {
  const visitedCountries = useAppSelector((state) => state.visitedCountries.visited);

  return (
    <>
    <Box>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Visited Countries
      </Typography>
      {visitedCountries.length === 0 ? (
        <Typography align="center">You haven't marked any countries as visited yet.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
            p: 2,
          }}
        >
          {visitedCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
            
          ))}
        </Box>
      )}
      
    </Box>
    
    </>
  );
};

export default VisitedCountriesPage;
