import { Lock } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navigation = () => {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/test">
          Test
        </Button>
        <Button color="inherit" component={RouterLink} to="/countries">
          Countries
        </Button>
        <Button color="inherit" component={RouterLink} to="/favorites">
          Favorites
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/protected"
          startIcon={<Lock />}
        >
          Protected Data
        </Button>
        {user ? (
          <Button color="inherit" onClick={signOut}>
            Logout ({user.email})
          </Button>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};