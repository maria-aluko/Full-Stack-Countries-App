import { Favorite, Lock } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            <Box sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
              <Typography
                variant="h5"
                component="span"
                
              >
                Country
              </Typography>
              <Typography
                variant="h5"
                component="span"
                sx={{ color: 'orange' }}
              >
                QUEST
              </Typography>
            </Box>
          </Button>
          {/* <Button color="inherit" component={RouterLink} to="/test">
            Test
          </Button> */}
          <Button color="inherit" component={RouterLink} to="/countries">
            Countries
          </Button>
          <Button>
            {user && (
              <Button 
                component={RouterLink}
                to="/favorites"
                startIcon={<Favorite />}
                sx={{ color: 'white' }}
              >
                Favorites
              </Button>
            )}
          </Button>
        </Box>
        {/* <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
        >
          Protected Data
        </Button> */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <Button color="inherit" onClick={signOut}>
            Logout ({user.email})
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};