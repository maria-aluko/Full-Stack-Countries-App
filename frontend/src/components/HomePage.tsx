import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HomePage = () => {
  return (
    <Box sx={{ px: 2, py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: { sm: 'md', lg: 'lg' }, mb: 6 }}>
              <Typography
                variant="h3"
                component="span"
                sx={{ display: 'block', lineHeight: 1.2 }}
              >
                Explore Countries with
              </Typography>
              <Typography
                variant="h3"
                component="span"
                sx={{ display: 'block', color: 'primary.main', lineHeight: 1.2 }}
              >
                Real-Time Data
              </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: 'md',
                  }}
                >
                  Discover details about every country worldwide – from capitals to regions, along with up-to-date weather conditions!
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
                  <Button
                    component={Link}
                    to="/about"
                    variant="outlined"
                    sx={{
                      color: 'text.secondary',
                      borderColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden', height: '100%' }}>
              <CardMedia
                component='img'
                src='/homePageImage.jpg'
                alt="Explore countries"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage