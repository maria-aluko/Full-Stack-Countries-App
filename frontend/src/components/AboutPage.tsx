import { Box, Button, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Box sx={{ px: 2, py: 8 }}>
      <Typography variant='h2'>
        CountryQUEST
      </Typography>
      <Typography>
        CountryQUEST is a platform where you can explore detailed information about countries around the world.
      </Typography>
      
      
      <Button
        component={Link}
        to="/countries"
        variant="contained"
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        Explore Now <ArrowForwardIcon />
      </Button>
    </Box>
  )
}

export default AboutPage