import { Box, Button, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';

const AboutPage = () => {

  const themeContext = useContext(ThemeContext);
    
    if (!themeContext) {
      throw new Error('ThemeContext is not provided');
    }
  
    const { theme } = themeContext;

  return (
    <Box sx={{ px: 2, py: 8, textAlign: 'center'}}>
      <Typography variant='h2' marginBottom='30px' sx={{color:theme === 'light' ? 'primary.main' : 'secondary.main'}}>
        Welcome to CountryQUEST
      </Typography>
      <Typography  margin="0 auto" maxWidth='600px' marginBottom='30px' lineHeight='1.8'>
        CountryQUEST is a platform where you can explore detailed information about countries around the world. The API provides up-to-date data on various aspects such as population, geography, and weather in the capital of each country.

        For more information about the APIs used in this project, visit: 
          <p></p>
          <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer" style={{ color: theme === 'light' ? 'primary.main' : 'secondary.main', textDecoration: 'none' }}>
            REST Countries API 
          </a> and <a href="https://openweathermap.org/api/" target="_blank" rel="noopener noreferrer" style={{ color: theme === 'light' ? 'primary.main' : 'secondary.main', textDecoration: 'none' }}>
            OpenWeather API
          </a>
      </Typography>
      
      <Typography  margin="0 auto" maxWidth='600px' marginBottom='30px' lineHeight='1.8'>
        You can add countries to your favorites list to keep track of the ones you are most interested in and quickly access them anytime. You can mark visited countries and see them on the world map with information about how much of the world you have visited. Please log in to see your favorites.
      </Typography>
      
      <Button
        component={Link}
        to="/countries"
        variant="contained"
        sx={{
          p: 2,
          marginRight: 2,
          backgroundColor: theme === 'light' ? 'primary.main' : 'secondary.main',
          color: 'white',
        }}
      >
        Explore Now <ArrowForwardIcon />
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        sx={{
          p:2,
          color: 'text.secondary',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'divider',
          },
        }}
      >
        Log In
      </Button>
    </Box>
  )
}

export default AboutPage